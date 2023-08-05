import useFormContext from "../../hooks/useFormContext"
//import Checkbox from './Checkbox'
const Shipping = () => {

    const { data, handleChange, checkboxes, handleChkBoxChange } = useFormContext()

    const content = (
        <>
            <label htmlFor="sameAsBilling">
                <input
                    type="checkbox"
                    id="sameAsBilling"
                    name="sameAsBilling"
                    checked={data.sameAsBilling}
                    onChange={handleChange}
                />
                Same as Billing Address
            </label>

            <div className="split-container">
                <div className="flex-col">
                    <label htmlFor="shipFirstName">First Name</label>
                    <input
                        type="text"
                        id="shipFirstName"
                        name="shipFirstName"
                        placeholder="John"
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.shipFirstName}
                        onChange={handleChange}
                        disabled={data.sameAsBilling}
                    />
                </div>
                <div className="flex-col">
                    <label htmlFor="shipLastName">Last Name</label>
                    <input
                        type="text"
                        id="shipLastName"
                        name="shipLastName"
                        placeholder="Doe"
                        pattern="([A-Z])[\w+.]{1,}"
                        value={data.shipLastName}
                        onChange={handleChange}
                        disabled={data.sameAsBilling}
                    />
                </div>
         
                <div className="flex-col">
            <label htmlFor="shipAddress1">Address</label>
            <input
                type="text"
                id="shipAddress1"
                name="shipAddress1"
                placeholder="131 Luxmi Bazar"
                pattern="[\w\d\s.#]{2,}"
                value={data.shipAddress1}
                onChange={handleChange}
                disabled={data.sameAsBilling}
            />
          
            <label htmlFor="shipAddress2"></label>
            <input
                type="text"
                id="shipAddress2"
                name="shipAddress2"
                placeholder="Shutrapur"
                pattern="[\w\d\s.#]{2,}"
                value={data.shipAddress2}
                onChange={handleChange}
                disabled={data.sameAsBilling}
            />

           </div>
           
           <div className="flex-col">
            <label htmlFor="shipCity">City</label>
            <input
                type="text"
                id="shipCity"
                name="shipCity"
                placeholder="Dhaka"
                pattern="([A-Z])[\w\s.]{1,}"
                value={data.shipCity}
                onChange={handleChange}
                disabled={data.sameAsBilling}
            />
          </div>
          
          <div className="flex-col">
            <label htmlFor="shipState">City</label>
            <select
                id="shipState"
                name="shipState"
                value={data.shipState}
                onChange={handleChange}
                disabled={data.sameAsBilling}>
                <option value="None">None</option>
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
                 
                <div className="flex-col">
            <label htmlFor="shipZipCode">Zip Code</label>
            <input
                type="text"
                id="shipZipCode"
                name="shipZipCode"
                placeholder="12345"
                pattern="[0-9]{5}"
                maxLength="5"
                value={data.shipZipCode}
                onChange={handleChange}
                disabled={data.sameAsBilling}
            />
            </div>
            </div>
             {/* <Checkbox name="checkbox1" value={5} /> */}
            <label>
            <input type="checkbox" name="checkbox1" value={500} checked={checkboxes.checkbox1} onChange={handleChkBoxChange} />
             Cleaning Service 500 taka
      </label>
      <label>
            <input type="checkbox" name="checkbox2" value={600} checked={checkboxes.checkbox2} onChange={handleChkBoxChange} />
             Home Shifting 600 taka
      </label>
        
        {/* <label>
            <input type="checkbox" name="checkbox1" value={5} checked={checkboxes.find(cb => cb.name === "checkbox1").isChecked} onChange={handleChkBoxChange} />
             Checkbox 5
      </label> 
      <label>
            <input type="checkbox" name="checkbox2" value={50.56} checked={checkboxes.find(cb => cb.name === "checkbox2").isChecked} onChange={handleChkBoxChange} />
             Checkbox 50
      </label> */}
      
        </>
    )

    return content
}
export default Shipping