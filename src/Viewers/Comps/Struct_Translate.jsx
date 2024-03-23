import React from 'react'
import Countries from "../../../countries.json"
import { FaLock } from "react-icons/fa"

const Struct_Translate = (props) => {
    let translations = props.property;

    let translateDynamic = translations && translations?.map((item, index) => {

        return(
            <div key={index} id={item.iso_3166_1} className='translateTmdb'>
                <div className="headTranslateTmdb">
                    <div className="translate_country_icon">
                        <img src={`https://flagcdn.com/w40/${item?.iso_3166_1.toLowerCase()}.png`} alt="" />
                    </div>
                    <div className="translate_country_details">
                        <div className="country_name_reg">
                            {
                                Countries?.map((country) => country.code == item.iso_3166_1 && country.name)
                            }
                        </div>
                        <div className="country_code_reg">
                            {
                                `(${item.iso_639_1}-${item.iso_3166_1})`
                            }
                        </div>
                    </div>
                </div>
                <div className="bodyTranslateTmdb">

                    <div className="translate_sys">
                        <div className="translate_sys_fs">Title</div>
                        <div className="translate_sys_md">{item?.data?.title}</div>
                        <div className="translate_sys_lt"><FaLock /></div>
                    </div>

                    <div className="translate_sys">
                    <div className="translate_sys_fs">Taglines</div>
                        <div className="translate_sys_md">{item.data.taglines}</div>
                        <div className="translate_sys_lt"><FaLock /></div>
                    </div>

                    <div className="translate_sys">
                        <div className="translate_sys_fs">Overview</div>
                        <div className="translate_sys_md">{item.data.overview}</div>
                        <div className="translate_sys_lt"><FaLock /></div>
                    </div>

                    <div className="translate_sys2">
                        <div className="translate_sys_fsd">---</div>
                        <div className="translate_sys_mdd1"><FaLock /></div>
                        <div className="translate_sys_mdd2">---</div>
                        <div className="translate_sys_ltd"><FaLock /></div>
                    </div>

                </div>
            </div>
        )
    })

  return (
    <div className="translatorForTmdb">
        {translateDynamic}
    </div>
  )
}

export default Struct_Translate