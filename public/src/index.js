const button = document.querySelector('button');
const endpoint = document.querySelector('#endpoint');
const query1 = document.querySelector('#query1');
const query2 = document.querySelector('#query2');
const result = document.querySelector('#result');

button.addEventListener('click', e => {
        const p1 = endpoint.options[endpoint.selectedIndex].value;
        const p2 = query1.options[query1.selectedIndex].value;
        const p3 = query2.options[query2.selectedIndex].value;
        console.log(p1, p2, p3);
        const urlParam = buildQueryString(p1, p2, p3);
        fetch(`http://localhost:3000/test/search${urlParam}`)
                .then(response => response.json())
                .then(url => {
                        result.textContent = url;
                })
                .catch(error => {
                        console.log(error);
                });
});

const buildQueryString = (endpoint, search1, search2) => {
        const newString = encodeURI(`${endpoint}/${search1}/${search2}`);
        console.log(encodeURI(newString));
        return newString;
};

const getValue = sel =>
        // console.log(sel.options[sel.selectedIndex].value);
        sel.options[sel.selectedIndex].value;
console.log(endpoint);
