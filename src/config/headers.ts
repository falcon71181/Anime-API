type HeaderConfig = {
  "USER_AGENT_HEADER": string,
  "ACCEPT_ENCODEING_HEADER": string,
  "ACCEPT_HEADER": string
}

const headers: HeaderConfig = {
  USER_AGENT_HEADER: "Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
  ACCEPT_ENCODEING_HEADER: "gzip, deflate, br",
  ACCEPT_HEADER: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
}

export { headers, HeaderConfig };
