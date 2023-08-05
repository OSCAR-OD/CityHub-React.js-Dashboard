import useFormContext from "../../hooks/useFormContext"

const OptIn = () => {
    const { data, handleChange } = useFormContext()

    const content = (
        <>
            <label htmlFor="optInNews">
                <input type="checkbox" id="optInNews" name="optInNews" checked={data.optInNews} onChange={handleChange} />
                Receive our newsletter
            </label>
            <ul className="flex-col">
                <li>Receive Notifications</li>
                <li>Find Out About New Services</li>
            </ul>
        </>
    )

    return content
}
export default OptIn