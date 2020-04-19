const button = document.querySelector('#formSubmitGET');
const buttonPOST = document.querySelector('#formSubmitPOST');
const endpoint = document.querySelector('#endpoint');
const query1 = document.querySelector('#query1');
const query2 = document.querySelector('#query2');
const result = document.querySelector('#result');
const selectAll = document.querySelector('#selectAll');
const resultFormat = document.querySelector('#resultFormat');

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

selectAll.addEventListener('click', e => {
        console.log(endpoint.options);
        endpoint.selectedIndex = 1;
        query1.selectedIndex = 1;
        query2.selectedIndex = 1;
});

buttonPOST.addEventListener('click', e => {
        e.preventDefault();
        const p1 = endpoint.options[endpoint.selectedIndex].value;
        const p2 = query1.options[query1.selectedIndex].value;
        const p3 = query2.options[query2.selectedIndex].value;
        console.log(p1, p2, p3);
        const urlParam = buildQueryString(p1, p2, p3);
        fetch('http://localhost:3000/test/post', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                        endpoint2: endpoint.options[endpoint.selectedIndex].value,
                        query1: query1.options[query1.selectedIndex].value,
                        query2: query2.options[query2.selectedIndex].value,
                        resultFormat: resultFormat.options[resultFormat.selectedIndex].value,
                }),
        })
                .then(response => response.json())
                .then(url => {
                        console.log(url);
                        if (url.length === 0) {
                                result.textContent = 'No results!  Please modify your search criteria.';
                        } else {
                                result.innerHTML = '';
                                url.forEach(value => {
                                        const newP = document.createElement('p');
                                        newP.textContent = value;
                                        result.appendChild(newP);
                                });
                        }
                })
                .catch(error => {
                        console.log(`${error} Rick`);
                });
});
const getValue = sel =>
        // console.log(sel.options[sel.selectedIndex].value);
        sel.options[sel.selectedIndex].value;

// http://localhost:3000/test/search${urlParam}`
