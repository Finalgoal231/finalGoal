Routes
- Auth
	post: /signup
	post: /signin
-----------------------------
	get: /user
	put: /user/role/:id
	delete: /user/:id
	get: /categories
	/**
		* uniq
		* sort by name
	**/
	post: /category
	put: /category/:id
	delete: /category/:id
-------------------------------
/** profile **/
	get: /user/:id
	put: /user/:id
	put: /user/password/:id
/** change password **/
	put: /user/avatar/:id
------------------------------
=========================================
- Article
	get: /articles/home
  /**
   * sort by latest
   * sort by cnt of comments
   * sort by cnt of favourites
   * search by title
   */
	get: /article/:id
	put: /article/:id
	put: /article/comment/:id
	put: /article/recomNum/:id
	delete: /article/:id
	post: /article










