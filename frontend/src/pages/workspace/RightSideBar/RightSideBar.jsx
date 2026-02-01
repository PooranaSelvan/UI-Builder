import React, { useRef, useState } from 'react'
import "./RightSideBar.css";
import "../../../index.css"
import { Icon, Settings } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Zap } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { Columns3 } from 'lucide-react';
import { Space } from 'lucide-react';
import { PaintbrushVertical } from 'lucide-react';
import { Grid2x2 } from 'lucide-react';
import { Type } from 'lucide-react';
import { TableRowsSplit } from 'lucide-react';
import { FileUp } from 'lucide-react';
import { UploadCloud } from 'lucide-react';
import { Link2 } from 'lucide-react';
import { Database } from 'lucide-react';
import { Webhook } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Cloud } from 'lucide-react';
import { MoveLeft, MoveRight, MoveDown, MoveUp } from 'lucide-react';
import ImportedFiles from './components/ImportedFiles';

const RightSideBar = () => {
    const [activeTab, setActiveTab] = useState("properties");
    const [activeButton, setActiveButton] = useState('row');
    const [opacity, setOpacity] = useState(100);
    const [font, setFont] = useState(16);
    const [files, setFiles] = useState([]);
    const [styles, setStyles] = useState({
        backgroundColor: "#ffffff",
        borderColor: "#dc2626",
        textColor: "#000000"
    });
    const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        meta: "—",
        type: file.name.split(".").pop(),
        status: "done",
        actions: true
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    console.log("Uploaded files:", newFiles);

};
    return (
        <main>
            <aside className="right-side-main-bar">
                <div className="button-flex">
                    {["properties", "style", "resources"].map((tab) => (
                        <button
                            key={tab}
                            className={activeTab === tab ? "active" : ""}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div className="right-side-content">
                    {activeTab === 'properties' && (
                        <>
                            <div className="properties-content">
                                <Heading icon={<Settings size={18}></Settings>} children={'General'} />
                                <div className="properties-general">
                                    <div>
                                        <label htmlFor="">Element Id</label>
                                        <input type="text" placeholder='element_id' />
                                    </div>
                                    <div>
                                        <label htmlFor="">Chart type</label>
                                        <input type="text" placeholder='type' />
                                    </div>
                                </div>
                                <Heading icon={<Zap size={18}></Zap>} children={'Events'} />
                                <div className="properties-general properties-event">
                                    <div>
                                        <input type="text" placeholder='click action' />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'style' && (
                        <div className="properties-content">
                            <Heading icon={<LayoutDashboard size={18} />} children={'Layout'} />
                            <div className="double-input">
                                <div className='input-child'>
                                    <label htmlFor="">Display</label>
                                    <select>
                                        <option selected="">Block</option>
                                        <option>Flex</option>
                                        <option>Grid</option>
                                        <option>Inline</option>
                                        <option>Inline-block</option>
                                        <option>None</option>
                                    </select>
                                </div>
                                <div className='input-child'>
                                    <label htmlFor="">Position</label>
                                    <select>
                                        <option selected="">Static</option>
                                        <option>Relative</option>
                                        <option>Absolute</option>
                                        <option>Fixed</option>
                                        <option>Sticky</option>
                                    </select>
                                </div>
                            </div>
                            <div className='long-input'>
                                <label>Width</label>
                                <div>
                                    <input type="text" placeholder='100%' />
                                    <select class="w-20 bg-gray-50 border border-gray-200 rounded text-xs py-1.5">
                                        <option>px</option>
                                        <option selected="">%</option>
                                        <option>rem</option>
                                        <option>em</option>
                                        <option>vw</option>
                                    </select>
                                </div>
                            </div>
                            <div className='long-input'>
                                <label>Height</label>
                                <div>
                                    <input type="text" placeholder='auto' />
                                    <select >
                                        <option>px</option>
                                        <option>%</option>
                                        <option>rem</option>
                                        <option>em</option>
                                        <option selected="">auto</option>
                                    </select>
                                </div>
                            </div>
                            <Heading icon={<Columns3 size={18} />} children={'Flex Layout'} />
                            <div className="four-button">
                                <div className="btn-box">
                                    {[
                                        { id: "row", icon: <MoveRight /> },
                                        { id: "row-reverse", icon: <MoveLeft /> },
                                        { id: "column", icon: <MoveDown /> },
                                        { id: "column-reverse", icon: <MoveUp /> }
                                    ].map(({ id, icon }) => (
                                        <button
                                            key={id}
                                            className={activeButton === id ? "active" : ""}
                                            onClick={() => setActiveButton(id)}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="double-input">
                                <div className='input-child'>
                                    <label htmlFor="">Justify Content</label>
                                    <select>
                                        <option>flex-start</option>
                                        <option>center</option>
                                        <option selected="">space-between</option>
                                        <option>space-around</option>
                                        <option>space-evenly</option>
                                        <option>flex-end</option>
                                    </select>
                                </div>
                                <div className='input-child'>
                                    <label htmlFor="">Align items</label>
                                    <select>
                                        <option>stretch</option>
                                        <option selected="">center</option>
                                        <option>flex-start</option>
                                        <option>flex-end</option>
                                        <option>baseline</option>
                                    </select>
                                </div>
                            </div>
                            <SliderInput label={'font size'} value={font} min={0} max={48} unit='px' onChange={setFont} />
                            <Heading icon={<Space size={18} />} children={'Spacing'} />
                            <div className="spacing-content">
                                <FourSideInput label={'Padding'} names={['top', 'Right', 'Bottom', 'Left']} />
                                <FourSideInput label={'Margin'} names={['top', 'Right', 'Bottom', 'Left']} />
                            </div>
                            <Heading icon={<PaintbrushVertical size={18} />} children={'Background'} />
                            <div className='background-content'>
                                <label htmlFor="">Background color</label>
                                <ColorPalette
                                    value={styles.backgroundColor}
                                    onChange={(v) =>
                                        setStyles((p) => ({ ...p, backgroundColor: v }))
                                    }
                                />
                                <SliderInput label={'opacity'} value={opacity} min={0} max={100} unit='%' onChange={setOpacity} />
                                <div className="background-image">
                                    <label htmlFor="">Background Image</label>
                                    <div className="image-input">
                                        <input type="text" placeholder='(url...)' />
                                        <button>Browse</button>
                                    </div>
                                </div>
                            </div>

                            <Heading icon={<Grid2x2 size={18} />} children={'Border'} />
                            <div className="border">
                                <div className="three-input">
                                    <div>
                                        <label htmlFor="">Width</label>
                                        <input type="text" value={'1px'} />
                                    </div>
                                    <div>
                                        <label htmlFor="">Style</label>
                                        <select>
                                            <option selected="">solid</option>
                                            <option>dashed</option>
                                            <option>dotted</option>
                                            <option>double</option>
                                            <option>none</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="">Color</label>
                                        <input type="text" value={'#E5E7EB'} />
                                    </div>
                                </div>
                                <FourSideInput label={'Border Radius'} names={['Top left', 'Top Right', 'Bottom Right', 'Bottom Left']} />
                            </div>
                            <Heading icon={<Type size={18} />} children={'Typography'} />
                            <div className="typo">
                                <div className="double-input">
                                    <div className='input-child'>
                                        <label htmlFor="">Font Size</label>
                                        <input type="number" />
                                    </div>
                                    <div className='input-child'>
                                        <label htmlFor="">Font Weight</label>
                                        <select>
                                            <option>100</option>
                                            <option>300</option>
                                            <option selected="">400</option>
                                            <option>500</option>
                                            <option>600</option>
                                            <option>700</option>
                                            <option>900</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="color">
                                    <label htmlFor="" id='text-color'>Text color</label>
                                    <ColorPalette
                                        value={styles.textColor}
                                        onChange={(v) =>
                                            setStyles((p) => ({ ...p, textColor: v }))
                                        }
                                    />
                                </div>
                                <div className="double-input">
                                    <div className='input-child'>
                                        <label htmlFor="">Text Align</label>
                                        <select>
                                            <option selected="">left</option>
                                            <option>center</option>
                                            <option>right</option>
                                            <option>justify</option>
                                        </select>
                                    </div>
                                    <div className='input-child'>
                                        <label htmlFor="">Line Height</label>
                                        <input type="text" />
                                    </div>
                                </div>
                            </div>
                            <Heading icon={<TableRowsSplit size={18} />} children={'Effects'} />
                            <div className="effects-content">
                                <FourSideInput label={'Box shadow'} names={['x', 'y', 'spread', 'blur']} />
                                <div className="color">
                                    <label htmlFor="" id='text-color'>Shadow color</label>
                                    <ColorPalette
                                        value={styles.borderColor}
                                        onChange={(v) =>
                                            setStyles((p) => ({ ...p, borderColor: v }))
                                        }
                                    />
                                </div>
                                <div className="three-input">
                                    <div>
                                        <label htmlFor="">Rotate</label>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        <label htmlFor="">scale</label>
                                        <select>
                                            <option selected="">solid</option>
                                            <option>dashed</option>
                                            <option>dotted</option>
                                            <option>double</option>
                                            <option>none</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="">opacity</label>
                                        <input type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'resources' && (
                        <div className="properties-content">
                            <Heading icon={<FileUp size={18} />} children={'External Data Source'} />
                            <FileUpload onFilesAdded={handleFiles} />
                            <ImportedFiles files={files} />
                            <Heading icon={<Database size={18} />} children={'Database Connection'} />
                            <div className="data-source">
                                <label htmlFor="">Data source</label>
                                <div className='data-row'>
                                    <span className='data-icon'>
                                        <Webhook size={12} />
                                    </span>
                                    <input type="text" value={'Postgre_SQL'} />
                                    <span className='data-pencil'><Pencil size={12} /></span>
                                </div>
                            </div>
                            <div className="sql-editor">
                                <pre className="sql-code">
                                    SELECT revenue, month FROM sales_2024 LIMIT 10
                                </pre>
                                <span className="sql-badge">SQL</span>
                            </div>
                            <Heading icon={<Webhook size={18} />} children={'API Connection'} />
                            <div className="api-connection">
                                <div className="api-row">
                                    <div className='api-text'>
                                        <span className='api-icon'><Cloud size={32} /></span>
                                        <div>
                                            <p>User API</p>
                                            <p className='link'>https://api.users.com</p>
                                        </div>
                                    </div>
                                    <div className='green-dot'>

                                    </div>
                                </div>
                            </div>
                            <button className='api-button'>Add new api</button>
                        </div>
                    )}
                </div>
            </aside>
        </main>
    )
}

const Heading = ({ icon, children }) => {
    return (
        <>
            <button className='properties-toggle'>
                <div>
                    <span id='btn-icon'>{icon}</span>
                    <span>{children}</span>
                </div>
                <span className='toggle-button'><ChevronDown size={18} /></span>
            </button>
        </>
    )
}

const FourSideInput = ({ label, values = [16, 16, 16, 16], names }) => {
    const [top, right, bottom, left] = values;
    const labelNames = names;

    return (
        <div className="four-side">
            <label className="four-side-title">{label}</label>

            <div className="four-side-grid">
                <div>
                    <span>{labelNames[0]}</span>
                    <input value={top} />
                </div>

                <div>
                    <span>{labelNames[1]}</span>
                    <input value={right} />
                </div>

                <div>
                    <span>{labelNames[2]}</span>
                    <input value={bottom} />
                </div>

                <div>
                    <span>{labelNames[3]}</span>
                    <input value={left} />
                </div>
            </div>
        </div>
    );

};

const ColorPalette = ({ value, onChange }) => {
    return (
        <div className="color-pallette">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <div className="color-box">
                <input
                    className="color-input"
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};

const SliderInput = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }) => {
    return (
        <>
            <div className="slider-input">
                <div className="slider-header">
                    <label>{label}</label>
                </div>
                <div className="slider-main">
                    <input type="range" min={min} max={max} step={step} onChange={(e) => onChange(Number(e.target.value))} />
                    <span className="slider-value">{value}{unit}</span>
                </div>
            </div>
        </>
    )
}



const FileUpload = ({ onFilesAdded }) => {
    const inputRef = useRef(null);

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={(e) => onFilesAdded(e.target.files)}
            />

            <div
                className="upload-box"
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    onFilesAdded(e.dataTransfer.files);
                }}
            >
                Drop files here or <span>browse</span>
            </div>
        </>
    );
};

export default RightSideBar