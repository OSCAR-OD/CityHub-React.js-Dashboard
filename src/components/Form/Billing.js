import useFormContext from "../../hooks/useFormContext"

const Billing = () => {

    const { data, handleChange } = useFormContext()

    const content = (
       
        <div className="flex-col">
            <div className="split-container">
                <div className="flex-col">
                    <label htmlFor="billFirstName">First Name</label>
                    <input
                        type="text"
                        id="billFirstName"
                        name="billFirstName"
                        placeholder="John"
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.billFirstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-col">
                    <label htmlFor="billLastName">Last Name</label>
                    <input
                        type="text"
                        id="billLastName"
                        name="billLastName"
                        placeholder="Doe"
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.billLastName}
                        onChange={handleChange}
                    />
                </div>
          
                <div className="flex-col">
            <label htmlFor="billAddress1">Address</label>
            <input
                type="text"
                id="billAddress1"
                name="billAddress1"
                placeholder="131 Luxmi Bazar"
                pattern="[\w\d\s.#]{2,}"
                value={data.billAddress1}
                onChange={handleChange}
            />
            <label htmlFor="billAddress2" className="offscreen">2nd Address line</label>
            <input type="text"
                id="billAddress2"
                name="billAddress2"
                placeholder="Shutrapur"
                pattern="[\w\d\s.#]{2,}"
                value={data.billAddress2}
                onChange={handleChange}
            />
         </div>
         <div className="flex-col">
           <label htmlFor="billCity">City</label>
             <input
                type="text"
                id="billCity"
                name="billCity"
                placeholder="Dhaka"
                pattern="([A-Z])[\w\s.]{1,}"
                value={data.billCity}
                onChange={handleChange}
            />
            </div>
            <div className="flex-col">
            <label htmlFor="billState">City</label>
            <select
                id="billState"
                name="billState"
                value={data.billState}
                onChange={handleChange}
            >
                 <option value="None      ">None</option>
                <option value="Dhaka      ">Dhaka      </option>
                <option value="Narsingdi  ">Narsingdi  </option>
                <option value="Chattogram ">Chattogram  </option>
                <option value="Bogura     ">Bogura        </option>
                <option value="Mymensingh ">Mymensingh    </option>
                <option value="Sirajganj  ">Sirajganj     </option>
                <option value="Sylhet     ">Sylhet        </option>
                <option value="Cox's Bazar">Cox's Bazar   </option>
                <option value="Khulna     ">Khulna        </option>
            </select>
            </div>
            <label htmlFor="billZipCode">Zip Code</label>
            <input
                type="text"
                id="billZipCode"
                name="billZipCode"
                placeholder="12345"
                pattern="[0-9]{5}"
                maxLength="5"
                value={data.billZipCode}
                onChange={handleChange}
            />
        </div>
        </div>
    )

    return content
}
export default Billing