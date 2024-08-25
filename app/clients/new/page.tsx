export default function CreateClient(){
    return (
        <>
            <h1>Create Client</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
                <button type="submit">Create</button>
            </form>
        </>
    )
}