const cookie = {
    set(cname, cvalue, exsec) {
        var d = new Date();
        d.setTime(d.getTime() + exsec * 1000);
        var expires = 'expires=' + d.toGMTString();
        document.cookie = cname + '=' + cvalue + '; ' + expires + ';path=/';
    },
    get(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
};

export default cookie;
