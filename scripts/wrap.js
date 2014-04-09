define(function(){
    return function(number, mod) {
        return (number + mod) % mod;
    };
});