const button = document.querySelector('button');
const endpoint = document.querySelector('#endpoint').innerHTML;
const query1 = document.querySelector('#query1').innerHTML;
const query2 = document.querySelector('#query2').innerHTML;
const result = document.querySelector('#result');

button.addEventListener('click', e => {
        const urlParam = buildQueryString(endpoint, query1, query2);
        fetch(`http://localhost:3000/test/search${urlParam}`)
                .then(response => response.json())
                .then(url => {
                        result.textContent = url;
                })
                .catch(error => {
                        console.log(e);
                });
});

const buildQueryString = (endpoint, search1, search2) => {
        const newString = encodeURI(`${endpoint}/${search1}/${search2}`);
        console.log(encodeURI(newString));
        return newString;
};
