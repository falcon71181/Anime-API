import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

interface CacheConfig {
  duration: number;
  keyParams?: string[]; // Specific query/body params to include in cache key
  ignoreParams?: string[]; // Params to exclude from cache key
  varyByHeaders?: string[]; // Headers to include in cache key
  customKeyGenerator?: (req: Request) => string; // Custom key generation function
}

interface CacheOptions {
  defaultTTL: number;
  checkPeriod?: number;
  maxKeys?: number;
}

class AdvancedCache {
  private cache: NodeCache;
  private defaultConfig: CacheConfig;

  constructor(options: CacheOptions) {
    this.cache = new NodeCache({
      stdTTL: options.defaultTTL,
      checkperiod: options.checkPeriod || 600,
      maxKeys: options.maxKeys || -1,
    });

    this.defaultConfig = {
      duration: options.defaultTTL,
      keyParams: [],
      ignoreParams: [],
      varyByHeaders: [],
    };
  }

  /**
   * Generate a cache key based on request and configuration
   */
  private generateCacheKey(req: Request, config: CacheConfig): string {
    if (config.customKeyGenerator) {
      return config.customKeyGenerator(req);
    }

    const components: string[] = [req.method, req.path];

    // Add specified query parameters
    const queryParams: Record<string, any> = {};
    if (req.query) {
      Object.keys(req.query).forEach((key) => {
        if (
          (!config.keyParams?.length || config.keyParams.includes(key)) &&
          !config.ignoreParams?.includes(key)
        ) {
          queryParams[key] = req.query[key];
        }
      });
    }

    // Add specified body parameters for POST/PUT requests
    const bodyParams: Record<string, any> = {};
    if (req.body && (req.method === "POST" || req.method === "PUT")) {
      Object.keys(req.body).forEach((key) => {
        if (
          (!config.keyParams?.length || config.keyParams.includes(key)) &&
          !config.ignoreParams?.includes(key)
        ) {
          bodyParams[key] = req.body[key];
        }
      });
    }

    // Add specified headers
    const headers: Record<string, any> = {};
    if (config.varyByHeaders?.length) {
      config.varyByHeaders.forEach((header) => {
        const headerValue = req.get(header);
        if (headerValue) {
          headers[header] = headerValue;
        }
      });
    }

    // Combine all components into a single key
    components.push(
      JSON.stringify(queryParams),
      JSON.stringify(bodyParams),
      JSON.stringify(headers),
    );

    return components.join("|");
  }

  /**
   * Create middleware with specific cache configuration
   */
  middleware(config?: Partial<CacheConfig>) {
    const finalConfig: CacheConfig = { ...this.defaultConfig, ...config };

    return (req: Request, res: Response, next: NextFunction) => {
      // Skip caching for non-GET methods unless explicitly configured
      if (req.method !== "GET" && !config?.customKeyGenerator) {
        return next();
      }

      const cacheKey = this.generateCacheKey(req, finalConfig);
      const cachedResponse = this.cache.get(cacheKey);

      if (cachedResponse) {
        return res.json(cachedResponse);
      }

      // Override res.json to cache the response
      const originalJson = res.json.bind(res);
      res.json = (body: any) => {
        this.cache.set(cacheKey, body, finalConfig.duration);
        return originalJson(body);
      };

      next();
    };
  }

  /**
   * Clear cache entries matching a pattern
   */
  clearCache(pattern?: RegExp): void {
    if (!pattern) {
      this.cache.flushAll();
      return;
    }

    const keys = this.cache.keys();
    keys.forEach((key) => {
      if (pattern.test(key)) {
        this.cache.del(key);
      }
    });
  }
}

const cacheManager = new AdvancedCache({
  defaultTTL: 3600 * 24, // 1 day default TTL
  checkPeriod: 600, // Check for expired keys every 10 minutes
  maxKeys: 1000, // Maximum number of cache entries
});

export { cacheManager, AdvancedCache, CacheConfig, CacheOptions };
