
export function render(resultArr) {

	const ul = document.createElement('ul')
	const output = document.getElementById('progress')
	const result = document.createElement('div')

	// clear out the existing area to render, in case use logs out/in
	output.textContent = ''


	// i want full list without urls

	fetch('/sites').then(r => r.json())
		.then(achievosArr => {

			let pointTotal = 0


			for (let i = 0; i < achievosArr.length; i++ ) {

				const li = document.createElement('li')
				const article = document.createElement('article')
				const titleWrapper = document.createElement('div')
				const points = document.createElement('span')
				const title = document.createElement('span')



				titleWrapper.classList.add('progress--title-wrap')
				article.classList.add('progress--link')
				points.classList.add('progress--points')
				title.classList.add('progress--title')
				result.classList.add('progress--result')

				title.textContent = achievosArr[i].title
				points.textContent = achievosArr[i].points

				titleWrapper.appendChild(title)


				// check if the current achievos is in the users collection, match on title
				for (let j = 0; j < resultArr.length; j++ ) {

					if (achievosArr[i].title === resultArr[j].title) {
						const url = document.createElement('span')

						pointTotal += achievosArr[i].points

						url.textContent = resultArr[j].url

						url.classList.add('progress--url')
						article.classList.add('completed')
						titleWrapper.appendChild(url)
						break // no need to keep looping, we have a winner

					}
				}



				article.appendChild(points)
				article.appendChild(titleWrapper)
				li.appendChild(article)
				ul.appendChild(li)

			}

			result.textContent = `Total pointssss 🐍 ${pointTotal}.`

			//ul.classList.add('hohoho')
			output.appendChild(ul)
			output.appendChild(result)


		})
		.catch(e => console.log('Booo', e))


}
