# API Design

## Auth

    	post: /api/signup

    	post: /api/signin

## Articles

    	post /api/article/create

    	put /api/article/:id

    	delete /api/article/:id

    	get /api/article/home

    	get /api/article/:id

    	put /api/article/comment/:id

    	put /api/article/favorite/:id

- sort by latest
- sort by cnt of comments
- sort by cnt of favourites
- search by title

## Admin

### User

			get			/api/user/all

			put			/api/user/role/:id

			delete	/api/user/:id

### Category

			get			api/category/:id

			put			api/category/:id

			put			api/category/password/:id

			put			api/category/avatar/:id
