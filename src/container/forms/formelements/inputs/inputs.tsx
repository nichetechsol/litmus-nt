import { FC, Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import Showcode from '../../../../components/ui/showcode/showcode';
import { input1, input2, input3, input4, input5, input6, input7, input8 } from '../../../../components/ui/data/formsdata';


interface InputsProps { }

const Inputs: FC<InputsProps> = () => {
    return (
        <Fragment>
            <Pageheader currentpage="Inputs" activepage="Form Elements" mainpage="Inputs" />
            <div className="grid grid-cols-12 gap-6 text-defaultsize">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Input Types" code={input1}>
                        <div className="grid grid-cols-12 sm:gap-6">
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <p className="mb-2 text-muted">Basic Input:</p>
                                <input type="text" className="form-control" id="input" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-label" className="form-label">Form Input With Label</label>
                                <input type="text" className="form-control" id="input-label" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-placeholder" className="form-label">Form Input With Placeholder</label>
                                <input type="text" className="form-control" id="input-placeholder" placeholder="Placeholder" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-text" className="form-label">Type Text</label>
                                <input type="text" className="form-control" id="input-text" placeholder="Text" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-number" className="form-label">Type Number</label>
                                <input type="number" className="form-control" id="input-number" placeholder="Number" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-password" className="form-label">Type Password</label>
                                <input type="password" className="form-control" id="input-password" placeholder="Password" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-email" className="form-label">Type Email</label>
                                <input type="email" className="form-control" id="input-email" placeholder="Email@xyz.com" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-tel" className="form-label">Type Tel</label>
                                <input type="tel" className="form-control" id="input-tel" placeholder="+1100-2031-1233" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-date" className="form-label">Type Date</label>
                                <input type="date" className="form-control" id="input-date" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-week" className="form-label">Type Week</label>
                                <input type="week" className="form-control" id="input-week" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-month" className="form-label">Type Month</label>
                                <input type="month" className="form-control" id="input-month" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-time" className="form-label">Type Time</label>
                                <input type="time" className="form-control" id="input-time" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-datetime-local" className="form-label">Type datetime-local</label>
                                <input type="datetime-local" className="form-control" id="input-datetime-local" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-search" className="form-label">Type Search</label>
                                <input type="search" className="form-control" id="input-search" placeholder="Search" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-submit" className="form-label">Type Submit</label>
                                <input type="submit" className="form-control ti-btn" id="input-submit" defaultValue="Submit" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-reset" className="form-label">Type Reset</label>
                                <input type="reset" className="form-control ti-btn" id="input-reset" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-button" className="form-label">Type Button</label>
                                <input type="button" className="form-control ti-btn !text-white !bg-primary" id="input-button" defaultValue="Button" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="xl:col-span-3 col-span-12 flex flex-col ">
                                        <label className="form-label">Type Color</label>
                                        <input className="form-control form-input-color !rounded-md" type="color" defaultValue="#136bd0" />
                                    </div>
                                    <div className="xl:col-span-5 col-span-12">
                                        <div className="form-check">
                                            <p className="mb-3 px-0 text-muted">Type Checkbox</p>
                                            <input className="form-check-input ms-2" type="checkbox" defaultValue="" defaultChecked />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-4 col-span-12">
                                        <div className="form-check">
                                            <p className="mb-4 px-0 text-muted">Type Radio</p>
                                            <input className="form-check-input ms-2" type="radio" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <div>
                                    <label htmlFor="file-input" className="sr-only">Type file</label>
                                    <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10
                                                 file:border-0
                                                file:bg-gray-200 file:me-4
                                                file:py-3 file:px-4
                                                dark:file:bg-black/20 dark:file:text-white/50"/>
                                </div>
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label className="form-label">Type Url</label>
                                <input className="form-control" type="url" name="website" placeholder="http://example.com" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-disabled" className="form-label">Type Disabled</label>
                                <input type="text" id="input-disabled" className="form-control" placeholder="Disabled input" disabled />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-readonlytext" className="form-label">Input Readonly Text</label>
                                <input type="text" readOnly className="form-control-plaintext" id="input-readonlytext" defaultValue="email@example.com" />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="disabled-readonlytext" className="form-label">Disabled Readonly Input</label>
                                <input className="form-control" type="text" defaultValue="Disabled readonly input" id="disabled-readonlytext" aria-label="Disabled input example" disabled readOnly />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label className="form-label">Type Readonly Input</label>
                                <input className="form-control" type="text" defaultValue="Readonly input here..." aria-label="readonly input example" readOnly />
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="text-area" className="form-label">Textarea</label>
                                <textarea className="form-control" id="text-area" rows={1}></textarea>
                            </div>
                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                <label htmlFor="input-DataList" className="form-label">Datalist example</label>
                                <input className="form-control" type="text" list="datalistOptions" id="input-DataList" placeholder="Type to search..." />
                                <datalist id="datalistOptions">
                                    <option value="San Francisco">
                                    </option>
                                    <option value="New York">
                                    </option>
                                    <option value="Seattle">
                                    </option>
                                    <option value="Los Angeles">
                                    </option>
                                    <option value="Chicago">
                                    </option>
                                </datalist>
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Input Shapes" code={input2}>
                        <div className="grid grid-cols-12 gap-y-3">
                            <div className="xl:col-span-12 col-span-12">
                                <label htmlFor="input-noradius" className="form-label">Input With No Radius</label>
                                <input type="text" className="form-control !rounded-none" id="input-noradius" placeholder="No Radius" />
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <label htmlFor="input-rounded" className="form-label">Input With Radius</label>
                                <input type="text" className="form-control" id="input-rounded" placeholder="Default Radius" />
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <label htmlFor="input-rounded-pill" className="form-label">Rounded Input</label>
                                <input type="text" className="form-control !rounded-full" id="input-rounded-pill" placeholder="Rounded" />
                            </div>
                        </div>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Input Border Style" code={input3}>
                        <div className="grid grid-cols-12 gap-y-3">
                            <div className="xl:col-span-12 col-span-12">
                                <label htmlFor="input-rounded1" className="form-label">Default</label>
                                <input type="text" className="form-control" id="input-rounded1" placeholder="Default" />
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <label htmlFor="input-rounded2" className="form-label">Dotted Input</label>
                                <input type="text" className="form-control border-dotted" id="input-rounded2" placeholder="Dotted" />
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <label htmlFor="input-rounded3" className="form-label">Dashed Input</label>
                                <input type="text" className="form-control border-dashed" id="input-rounded3" placeholder="Dashed" />
                            </div>
                        </div>
                    </Showcode>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <Showcode title="Input Sizing" code={input4}>
                        <input className="form-control form-control-sm mb-3" type="text"
                            placeholder=".form-control-sm" aria-label=".form-control-sm example" />
                        <input className="form-control mb-3" type="text" placeholder="Default input"
                            aria-label="default input example" />
                        <input className="form-control form-control-lg" type="text"
                            placeholder=".form-control-lg" aria-label=".form-control-lg example" />
                    </Showcode>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Overview" code={input5}>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email
                                    address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll
                                    never share your email
                                    with
                                    anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 form-check !ps-0">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label ps-2" htmlFor="exampleCheck1">Check
                                    me out</label>
                            </div>
                            <button type="submit" className="ti-btn ti-btn-primary-full">Submit</button>
                        </form>
                    </Showcode>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <div className="grid grid-cols-12">
                        <div className="xl:col-span-12 col-span-12">
                            <Showcode title="Form text" code={input6}>
                                <label htmlFor="inputPassword5" className="form-label">Password</label>
                                <input type="password" id="inputPassword5" className="form-control"
                                    aria-describedby="passwordHelpBlock" />
                                <div id="passwordHelpBlock" className="form-text">
                                    Your password must be 8-20 characters long, contain letters and
                                    numbers,
                                    and
                                    must not contain spaces, special characters, or emoji.
                                </div>
                            </Showcode>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <Showcode title=" Inline text can use any typical inline HTML element with nothing more
                                                than" code={input7}>
                                <div className="sm:grid grid-cols-12 gap-4 items-center">
                                    <div className="xxxl:col-span-1 col-span-2">
                                        <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                                    </div>
                                    <div className="col-span-3">
                                        <input type="password" id="inputPassword6" className="form-control"
                                            aria-describedby="passwordHelpInline" />
                                    </div>
                                    <div className="col-span-7">
                                        <span id="passwordHelpInline" className="form-text">
                                            Must be 8-20 characters long.
                                        </span>
                                    </div>
                                </div>
                            </Showcode>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-6 col-span-12">
                    <Showcode title="Disabled forms" code={input8}>
                        <form>
                            <fieldset disabled>
                                <legend className="text-2xl">Disabled fieldset example</legend>
                                <div className="mb-3">
                                    <label htmlFor="disabledTextInput" className="form-label">Disabled
                                        input</label>
                                    <input type="text" id="disabledTextInput" className="form-control"
                                        placeholder="Disabled input" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="disabledSelect" className="form-label">Disabled select
                                        menu</label>
                                    <select id="disabledSelect" className="form-select">
                                        <option>Disabled select</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check !ps-0">
                                        <input className="form-check-input" type="checkbox"
                                            id="disabledFieldsetCheck" disabled />
                                        <label className="form-check-label ps-2" htmlFor="disabledFieldsetCheck">
                                            Can't check this
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="ti-btn ti-btn-primary-full opacity-[0.6]">Submit</button>
                            </fieldset>
                        </form>
                    </Showcode>
                </div>
            </div>
        </Fragment>
    );
}
export default Inputs;
