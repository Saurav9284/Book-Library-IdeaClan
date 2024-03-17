const authorization = (context, role) => {
    if(!context.user){
        throw new Error('Please login first ');
    }
    if (context.user.role !== role) {
        throw new Error('Only Admin can do this');
    }
}
module.exports  = authorization