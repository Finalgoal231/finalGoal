-Auth

username:{
	type:string;
	required:true;
	unique: true;
	$regex:[a-z][0-9][_];
},
name:{
	type:string;
	required:true
},
bio:{
	type:string;
},
avatar:{
	type: string;/*avatar's path */
	defaule:"public/default.jpg";
}
role:{
	type:string;
	default:"guest";
},
follow:[{
	type:mongoose.Schema.ObjectId,
}],
category:[{
	type:mongoose.Schema.ObjectId,
}]

-Article
from:{
	type:string;
	required:true;
},
title:{
	type:string;
	required:true;
},
category:{
	type:string;
	required:true
},
tags:[{
	type:string;
}],
content:{
	type: string;
},
draft:{
	type:number;
	default:0;
},
favouritor: [{
	type:String;
	default:0;
}]a,
comment:[{
	from:{
		type:string;
		required:true;
	     },
	title:{
		type:string;
		required:true;
	      },
	category:{
		type:string;
		required:true
	        },
	tags:[{
		type:string;
	     }],
	content:{
		type: string;
	        },
	
	draft:{
		type:number; 
		default:0;
	},
}],





