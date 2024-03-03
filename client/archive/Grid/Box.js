import "./Box.css"

export function Box({image, name})
{
    return (
        <>
        <button
          className="square"
        >
            <div class="imgwithtext">
                <img src= {image} alt="album cover" width="200" height="200"></img>
                <p> {name} </p>
            </div>
        </button>
        </>

    )
}
export default Box;
