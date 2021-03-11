function views(app){
    app.get("/", (req, res)=>{
        res.send("I'm on the '/' page.");
    });
    app.get("/route", (req, res)=>{
        res.send("I'm on the '/route' page.");
    });
    /**
     * TENER EXTREMO CUIDADO con la colocación de esta ruta.
     * Si se declarase, deberia ser siempre la última del proyecto.
     * Si estuviese de primera, ninguna otra ruta podria ejecutar
     */
    app.get("*", (req, res)=>{
        res.send("Where am I?");
    });
}

export default views;