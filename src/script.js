document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[rel=js-theme-toggle]').forEach(toggle => {
		toggle.addEventListener('click', e => {
			document.documentElement.setAttribute('data-theme', e.target.dataset.themeName)
		})
	})
})
