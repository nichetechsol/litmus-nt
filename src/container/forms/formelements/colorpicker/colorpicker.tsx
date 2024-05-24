import { FC, Fragment, useEffect, useRef } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import Showcode from '../../../../components/ui/showcode/showcode';
import { color1 } from '../../../../components/ui/data/formsdata';
import Pickr from "@simonwep/pickr";

interface ColorpickerProps { }

const Colorpicker: FC<ColorpickerProps> = () => {
    // Nano color picker
    const colorPicker = useRef<any>();

    useEffect(() => {
        if (colorPicker.current) {
            const pickr = Pickr.create({
                el: '.color-picker',
                theme: 'nano',
                default: '#05C3FB',
                swatches: [
                    'rgba(156, 39, 176, 0.9)',
                    'rgba(103, 58, 183, 0.85)',
                    'rgba(63, 81, 181, 0.8)',
                    'rgba(33, 150, 243, 0.75)',
                    'rgba(3, 169, 244, 0.7)',
                    'rgba(0, 188, 212, 0.7)',
                    'rgba(0, 150, 136, 0.75)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(244, 67, 54, 1)',
                    'rgba(233, 30, 99, 0.95)',
                    'rgba(139, 195, 74, 0.85)',
                    'rgba(205, 220, 57, 0.9)',
                    'rgba(255, 235, 59, 0.95)',
                    'rgba(255, 193, 7, 1)'
                ],

                components: {
                    // Main components
                    preview: true,
                    opacity: true,
                    hue: false,

                    // Input / output Options
                    interaction: {
                        hex: true,
                        input: true,
                        clear: true,
                        save: true
                    }
                }
            });
            (pickr);
        }
    }, []);

    // Classic color picker
    const classicPicker = useRef<any>();

    useEffect(() => {
        if (classicPicker.current) {
            const pickr = Pickr.create({
                el: '.color-picker',
                theme: 'classic',
                default: '#6C5FFC',
                swatches: [
                    'rgba(244, 67, 54, 1)',
                    'rgba(233, 30, 99, 0.95)',
                    'rgba(156, 39, 176, 0.9)',
                    'rgba(103, 58, 183, 0.85)',
                    'rgba(63, 81, 181, 0.8)',
                    'rgba(33, 150, 243, 0.75)',
                    'rgba(3, 169, 244, 0.7)',
                    'rgba(0, 188, 212, 0.7)',
                    'rgba(0, 150, 136, 0.75)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(139, 195, 74, 0.85)',
                    'rgba(205, 220, 57, 0.9)',
                    'rgba(255, 235, 59, 0.95)',
                    'rgba(255, 193, 7, 1)'
                ],

                components: {
                    preview: true,
                    opacity: true,
                    hue: true,

                    interaction: {
                        hex: true,
                        rgba: true,
                        hsva: true,
                        input: true,
                        clear: true,
                        save: true
                    }
                }

            });
            (pickr);
        }
    }, []);

    // Monolith color picker

    const monolithPicker = useRef<any>();

    useEffect(() => {
        if (monolithPicker.current) {
            const pickr = Pickr.create({
                el: '.color-picker',
                theme: 'classic',
                default: '#FC5296',

                swatches: [
                    'rgba(55, 35, 9, 0.5)',
                    'rgba(44, 67, 54, 1)',
                    'rgba(33, 30, 99, 0.95)',
                    'rgba(56, 39, 176, 0.9)',
                    'rgba(03, 58, 183, 0.85)',
                    'rgba(163, 81, 181, 0.8)',
                    'rgba(33, 150, 243, 0.75)',
                    'rgba(3, 169, 244, 0.7)',
                    'rgba(0, 188, 212, 0.7)',
                    'rgba(0, 150, 136, 0.75)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(139, 195, 74, 0.85)',
                    'rgba(205, 220, 57, 0.9)',

                    'rgba(255, 193, 7, 1)'
                ],

                components: {
                    // Main components
                    preview: true,
                    opacity: true,
                    hue: false,

                    // Input / output Options
                    interaction: {

                        input: true,
                        clear: true,
                        save: true
                    }
                }
            });
            (pickr);
        }
    }, []);

    return (
        <Fragment>
            <Pageheader currentpage="Color Picker" activepage="Form Elements" mainpage="Color Picker" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-3 col-span-12">
                    <Showcode title="Color Picker" code={color1}>
                        <input type="color" className="form-control form-control-color !border-0"
                            id="exampleColorInput" defaultValue="#136ad0" title="Choose your color" />
                    </Showcode>
                </div>
                <div className="xl:col-span-9 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Classic
                            </div>
                        </div>
                        <div className="box-body flex justify-between">
                            <div>
                                <div className="theme-container hidden">
                                    <button className="active">classic</button>
                                </div>
                                <div className="pickr-container example-picker">
                                    <div className="pickr">
                                        <div className="color-picker" ref={monolithPicker}></div>


                                    </div></div> </div> <div>
                                <div className="theme-container1 hidden">
                                    <button className="active">monolith</button>
                                </div>
                                <div className="pickr-container1 example-picker">
                                    <div className="pickr">
                                        <div className="color-picker" ref={colorPicker}></div>


                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="theme-container2 hidden">
                                    <button className="active">nano</button>
                                </div>
                                <div className="pickr-container2 example-picker">
                                    <div className="pickr">
                                        <div className="color-picker" ref={classicPicker}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Colorpicker;
