export function getDouBanComedyData() {
    const URL = 'https://movie.douban.com/j/chart/top_list';
    const query = {
        type: 24,
        interval_id: '100:90',
        start: 0,
        limit: 100,
    };
    const REQUEST_URL = param(URL, query);
    return fetch(REQUEST_URL, {
        method: 'GET'
    }).then(res => res.json()).then(res_data => {
        return res_data;
    }).catch(e => {
        console.log(e);
    });
}

function param(url, query) {
    for(let key in query) {
        let connect = url.match(/.*(\?)/) ? '&' : '?';
        url += `${connect}${key}=${query[key]}`;
    }
    return url;
}