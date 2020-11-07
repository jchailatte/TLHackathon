resp=$(curl --location --request GET 'https://api.liquipedia.net/apikey' \
--header 'authority: api.liquipedia.net' \
--header 'pragma: no-cache' \
--header 'cache-control: no-cache' \
--header 'dnt: 1' \
--header 'upgrade-insecure-requests: 1' \
--header 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36' \
--header 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9' \
--header 'sec-fetch-site: same-origin' \
--header 'sec-fetch-mode: navigate' \
--header 'sec-fetch-user: ?1' \
--header 'sec-fetch-dest: document' \
--header 'referer: https://api.liquipedia.net/documentation/api' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cookie: _ga=GA1.2.573177729.1603439376; _gid=GA1.2.129210635.1604718283; LPDB_SESSION=bb176qu9hnvvhp3i8ocjfqm0red1l0gp; _gat_gtag_UA_576564_23=1; LPDB_SESSION=8vda0sbblb7svu8nna50va667506oi4c')
api_key=$(echo $resp | sed -E 's/.*name=\"apikey\" value=\"(.*)\"><input type=\"hidden\" name=\"_csrf.*csrf.*/\1/')
echo $api_key
