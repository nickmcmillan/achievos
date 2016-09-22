

export function render(resultArr) {

	//const template = document.getElementById('progress--template')


	const ul = document.createElement('ul')
	const output = document.getElementById('progress--output')
	//const articleOuter = document.createElement('div')
	output.innerHTML = ''

	console.log('yo', resultArr);

	for (let i = 0; i < resultArr.length; i++ ) {

        let li = document.createElement('li')

		li.textContent = resultArr[i].title
        ul.appendChild(li)

	}


    ul.classList.add('hohoho')
    output.appendChild(ul)


}
