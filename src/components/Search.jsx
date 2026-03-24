import "./Search.scss"
export default function Search() {
    return(
        <div className="search">
            <h3>Søg blandt 158 boliger til salg i 74 butikker</h3>
            <p>Hvad skal din næste bolig indeholde</p>
            <form className="search_form" action="">
                <input placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende" type="text" name="" id="" />
                <button>Søg</button>
            </form>
        </div>
    )
}