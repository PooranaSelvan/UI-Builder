import React, { useEffect, useRef, useState } from 'react'
import "./RightSideBar.css";
import "../../../index.css"
import { Icon, Settings } from 'lucide-react';
import { v4 as uuidv4 } from "uuid";
import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import { Zap } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { Columns3 } from 'lucide-react';
import { Space } from 'lucide-react';
import { MountainSnow } from 'lucide-react';
import { Grid2x2 } from 'lucide-react';
import { Type } from 'lucide-react';
import { TableRowsSplit } from 'lucide-react';
import { FileUp } from 'lucide-react';
import { Database } from 'lucide-react';
import { Webhook } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Cloud, Braces } from 'lucide-react';
import { MoveLeft, MoveRight, MoveDown, MoveUp } from 'lucide-react';
import { Workflow } from 'lucide-react';
import ImportedFiles from './components/ImportedFiles';
import ImageUpload from './components/ImageUpload';
import WebFont from 'webfontloader';

/*Used in the rendering of the select tag in the units for height, width */
const UNITS = ["px", "%", "rem", "em", "auto"];

/*used to render the required events according to the component is selected */
const EVENT_MAP = {
    button: ["navigation", "visibility", "style"],
    link: ["navigation", "style"],
    menu: ["navigation", "visibility", "style"],
    card: ["navigation", "visibility", "style"],
    modal: ["visibility", "style"],
    select: ["visibility", "style"],
    tooltip: ["visibility", "style"],
    img: ["visibility", "style"],
    text: ["visibility", "style"],
    div: ["visibility", "style"]
};

const RightSideBar = ({ selectedComponent, updateComponent, deleteComponent }) => {
    const [activeTab, setActiveTab] = useState("properties");
    // const [activeButton, setActiveButton] = useState('row');
    // const [opacity, setOpacity] = useState(100);
    // const [font, setFont] = useState(16);
    const [files, setFiles] = useState([]);
    const [apiUrl, setApiUrl] = useState("");
    const [loadingApi, setLoadingApi] = useState(false);
    const [eventType, setEventType] = useState("");
    const [error, setError] = useState("");
    // const fileRef = useRef(null);
    const display = selectedComponent?.defaultProps?.style?.display || "block";
    const allowedEvents = EVENT_MAP[selectedComponent?.tag] || [];

    /*To fetch the data from the api that entered by the user */
    const fetchApiData = async () => {
        if (!apiUrl) {
            return;
        }
        try {
            setLoadingApi(true);

            const res = await fetch(apiUrl);
            const data = await res.json();

            updateComponent(selectedComponent.id, (node) => {
                node.content = JSON.stringify(data, null, 2);
            })
        } catch (err) {
            alert("Api fetch failed");
        } finally {
            setLoadingApi(false)
        }
    }

    const handleFiles = async (fileList) => {
        const file = fileList[0];

        if (!file) return;

        const text = await file.text();

        const rows = text.split("\n").map(line => line.split(",").map(cell => cell.trim()));

        const formattedText = rows.map(row => row.join(" - ")).join("\n");

        updateComponent(selectedComponent.id, (node) => {
            node.content = formattedText;
        });

        const newFile = {
            id: uuidv4(),
            name: file.name,
            /*Convert the input that come as bytes to kb */
            size: `${(file.size / 1024).toFixed(1)} KB`,
            type: file.name.split(".").pop(),
            status: "done",
            actions: true
        };

        setFiles(prev => [...prev, newFile]);
    };

    /*Render the right panel only if a component is selected */
    if (!selectedComponent) {
        return (
            <aside className="right-side-main-bar empty">
                <p className='error-text'>Select an element to edit</p>
            </aside>
        );
    }

    return (
        <aside className='right-panel' onMouseOver={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
            <div className="right-side-main-bar">
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
                                <Heading icon={<Settings size={18}></Settings>} title={'General'}>
                                    <div className="properties-general">
                                        <div>
                                            <label htmlFor="">Element Id</label>
                                            <input type="text" placeholder='element_id' value={selectedComponent.id} onChange={(e) => {
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.id = e.target.value;
                                                });
                                            }} disabled />
                                        </div>
                                        {selectedComponent.tag !== 'img' && (
                                            <div className='content'>
                                                <label htmlFor="">Content</label>
                                                <input type="text" value={selectedComponent.content} onChange={(e) => {
                                                    const value = e.target.value
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.content = value;
                                                    });

                                                    if(error) {
                                                        setError("");
                                                    }
                                                }}
                                                onBlur={(e) => {
                                                    const value = e.target.value;
                                                    const hasChildren = selectedComponent.children?.length;

                                                    if(!hasChildren && value.trim() === ""){
                                                        setError("The content must contain a character")
                                                    }
                                                }}
                                                />
                                                {error && <p style={{color : "red", fontSize : "14px"}}>{error}</p>}
                                            </div>
                                        )}
                                        {selectedComponent.tag === 'img' && (
                                            <div className='content'>
                                                <label htmlFor="">Source</label>
                                                <input type="text" value={selectedComponent.defaultProps?.src} onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        /*Check for wheather the object is present in the selected component if not it will create the object and then store the data */
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.src = e.target.value;
                                                    })
                                                }} />
                                            </div>
                                        )}

                                    </div>
                                </Heading>

                                <Heading icon={<Zap size={18}></Zap>} title={'Events'} >
                                    <div className="properties-general properties-event">
                                        <div>
                                            <select value={eventType} onChange={(e) => {
                                                setEventType(e.target.value)
                                            }}>
                                                <option value="">Select Event</option>

                                                {allowedEvents.includes("navigation") && (
                                                    <option value="navigation">Navigation Actions</option>
                                                )}

                                                {allowedEvents.includes("visibility") && (
                                                    <option value="visibility">Visibility Actions</option>
                                                )}

                                                {allowedEvents.includes("style") && (
                                                    <option value="style">Style & Layout Actions</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </Heading>
                                {eventType !== "" && (
                                    <Heading icon={<Workflow size={18} />} title="Behavior">
                                        {eventType === "navigation" && (
                                            <div className="event-form">
                                                <label>Target URL / Page</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter URL"
                                                    onChange={(e) =>
                                                        updateComponent(selectedComponent.id, (node) => {
                                                            node.defaultProps ??= {};
                                                            node.defaultProps.events ??= {};
                                                            node.defaultProps.events.navigation = {
                                                                type: "navigate",
                                                                target: e.target.value,
                                                            };
                                                        })
                                                    }
                                                />
                                            </div>
                                        )}

                                        {eventType === "visibility" && (
                                            <div className="event-form">
                                                <label>Action</label>

                                                <select
                                                    onChange={(e) =>
                                                        updateComponent(selectedComponent.id, (node) => {
                                                            node.defaultProps ??= {};
                                                            node.defaultProps.events ??= {};
                                                            node.defaultProps.events.visibility = {
                                                                action: e.target.value,
                                                            };
                                                        })
                                                    }
                                                >
                                                    <option value="show">Show</option>
                                                    <option value="hide">Hide</option>
                                                    <option value="toggle">Toggle</option>
                                                </select>
                                            </div>
                                        )}

                                        {eventType === "style" && (
                                            <div className="event-form">
                                                <label>Hover Color</label>

                                                <ColorPalette
                                                    value={
                                                        selectedComponent.defaultProps?.events?.style?.hoverColor || "#000000"
                                                    }
                                                    onChange={(color) =>
                                                        updateComponent(selectedComponent.id, (node) => {
                                                            node.defaultProps ??= {};
                                                            node.defaultProps.events ??= {};
                                                            node.defaultProps.events.style ??= {};

                                                            node.defaultProps.events.style.hoverColor = color;
                                                        })
                                                    }
                                                />
                                            </div>
                                        )}

                                    </Heading>
                                )}

                            </div>
                        </>
                    )}

                    {activeTab === 'style' && (
                        <div className="properties-content">
                            <Heading icon={<LayoutDashboard size={18} />} title={'Layout'} >
                                <div className="double-input">
                                    <div className="input-child">
                                        <label>Display</label>
                                        <select
                                            value={display}
                                            onChange={(e) => {
                                                let value = e.target.value
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};

                                                    let className = node.defaultProps.className;

                                                    if (value === 'none') {
                                                        if (!className.includes('hidden')) {
                                                            node.defaultProps.className = className + " hidden";
                                                            node.defaultProps.style.opacity = 0.2
                                                        }
                                                    } else {
                                                        node.defaultProps.className = className.replace('hidden', "").trim();
                                                        node.defaultProps.style.opacity = 1;
                                                        node.defaultProps.style.display = value;
                                                    }
                                                })
                                            }}
                                        >
                                            <option value="block">Block</option>
                                            <option value="flex">Flex</option>
                                            <option value="grid">Grid</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    <div className='input-child'>
                                        <label htmlFor="">Position</label>
                                        <select value={selectedComponent?.defaultProps?.style?.position || "static"} onChange={(e) => {
                                            updateComponent(selectedComponent.id, (node) => {
                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};
                                                node.defaultProps.style.position = e.target.value;
                                            })
                                        }}>
                                            <option value="static">Static</option>
                                            <option value="relative">Relative</option>
                                            <option value="absolute">Absolute</option>
                                            <option value="fixed">Fixed</option>
                                            <option value="sticky">Sticky</option>
                                        </select>
                                    </div>
                                </div>
                                <FourSideInput
                                    label={'position value'}
                                    names={["Top", "Right", "Bottom", "Left"]}
                                    values={[
                                        parseInt(selectedComponent.defaultProps?.style?.top || 0),
                                        parseInt(selectedComponent.defaultProps?.style?.right) || 0,
                                        parseInt(selectedComponent.defaultProps?.style?.bottom) || 0,
                                        parseInt(selectedComponent.defaultProps?.style?.left) || 0,
                                    ]}
                                    onChange={(index, value) => {
                                        updateComponent(selectedComponent.id, (node) => {
                                            const map = [
                                                "top",
                                                "right",
                                                "bottom",
                                                "left",
                                            ];

                                            node.defaultProps ??= {};
                                            node.defaultProps.style ??= {};

                                            const actualValue = String(value).replace("px", "");

                                            node.defaultProps.style[map[index]] = `${actualValue}px`;
                                        })
                                    }}
                                />
                                <div className="double-input">
                                    <div className='input-child'>
                                        <SizeInput
                                            label="Width"
                                            value={selectedComponent.defaultProps?.style?.width}
                                            onChange={(v) =>
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.width = v;
                                                })
                                            }
                                        />
                                    </div>
                                    <div className='input-child'>
                                        <SizeInput
                                            label="Height"
                                            value={selectedComponent.defaultProps?.style?.height}
                                            onChange={(v) =>
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.height = v;
                                                })
                                            }
                                        />
                                    </div>
                                </div>


                            </Heading>
                            {display === 'flex' && (
                                <Heading icon={<Columns3 size={18} />} title={'Flex Layout'} >
                                    <div className="four-button">
                                        <div className="btn-box">
                                            {[
                                                { id: "row", icon: <MoveRight size={14} /> },
                                                { id: "row-reverse", icon: <MoveLeft size={14} /> },
                                                { id: "column", icon: <MoveDown size={14} /> },
                                                { id: "column-reverse", icon: <MoveUp size={14} /> }
                                            ].map(({ id, icon }) => (
                                                <button
                                                    key={id}
                                                    className={selectedComponent.defaultProps?.style?.flexDirection === id ? "active" : ""}
                                                    onClick={() => {
                                                        updateComponent(selectedComponent.id, (node) => {
                                                            node.defaultProps ??= {};
                                                            node.defaultProps.style ??= {};
                                                            node.defaultProps.style.flexDirection = id;
                                                        });
                                                    }}
                                                >
                                                    {icon}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="double-input">
                                        <div className='input-child'>
                                            <label htmlFor="">Justify Content</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.justifyContent || ""}
                                                onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ??= {};
                                                        node.defaultProps.style.justifyContent = e.target.value;
                                                    });
                                                }}
                                            >
                                                <option value="flex-start">flex-start</option>
                                                <option value="center">center</option>
                                                <option value="space-between">space-between</option>
                                                <option value="space-around">space-around</option>
                                                <option value="space-evenly">space-evenly</option>
                                                <option value="flex-end">flex-end</option>
                                            </select>
                                        </div>
                                        <div className='input-child'>
                                            <label htmlFor="">Align items</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.alignItems || ""}
                                                onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ??= {};
                                                        node.defaultProps.style.alignItems = e.target.value;
                                                    });
                                                }}
                                            >
                                                <option value="stretch">stretch</option>
                                                <option value="center">center</option>
                                                <option value="flex-start">flex-start</option>
                                                <option value="flex-end">flex-end</option>
                                                <option value="baseline">baseline</option>
                                            </select>
                                        </div>
                                    </div>
                                    <SizeInput
                                        label={'Gap'}
                                        value={selectedComponent.defaultProps?.style?.gap || 0}
                                        onChange={(v) => {
                                            updateComponent(selectedComponent.id, (node) => {
                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};
                                                node.defaultProps.style.gap = v;
                                            })
                                        }}
                                    />
                                    <div className='wrap-input'>
                                        <label htmlFor="">Align items</label>
                                        <select
                                            value={selectedComponent.defaultProps?.style?.alignItems || ""}
                                            onChange={(e) => {
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.alignItems = e.target.value;
                                                });
                                            }}
                                        >
                                            <option value="stretch">stretch</option>
                                            <option value="center">center</option>
                                            <option value="flex-start">flex-start</option>
                                            <option value="flex-end">flex-end</option>
                                            <option value="baseline">baseline</option>
                                        </select>
                                    </div>
                                </Heading>
                            )}
                            {display === 'grid' && (
                                <Heading icon={<Grid2x2 size={18} />} title="Grid Layout">
                                    <GridTemplateInput
                                        label="Grid Columns"
                                        value={selectedComponent.defaultProps?.style?.gridTemplateColumns}
                                        onChange={(v) =>
                                            updateComponent(selectedComponent.id, (node) => {
                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};
                                                node.defaultProps.style.gridTemplateColumns = v;
                                            })
                                        }
                                    />

                                    <GridTemplateInput
                                        label="Grid Rows"
                                        value={selectedComponent.defaultProps?.style?.gridTemplateRows}
                                        onChange={(v) =>
                                            updateComponent(selectedComponent.id, (node) => {
                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};
                                                node.defaultProps.style.gridTemplateRows = v;
                                            })
                                        }
                                    />
                                    <SliderInput
                                        label="Gap"
                                        value={parseFloat(selectedComponent.defaultProps?.style?.gap || 0)}
                                        unit="px"
                                        min={0}
                                        max={100}
                                        onChange={(v) =>
                                            updateComponent(selectedComponent.id, (node) => {
                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};
                                                node.defaultProps.style.gap = `${v}px`;
                                            })
                                        }
                                    />
                                    <div className="double-input">
                                        <div className="input-child">
                                            <label>Justify Items</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.justifyItems || "stretch"}
                                                onChange={(e) =>
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ??= {};
                                                        node.defaultProps.style.justifyItems = e.target.value;
                                                    })
                                                }
                                            >
                                                <option value="start">start</option>
                                                <option value="center">center</option>
                                                <option value="end">end</option>
                                                <option value="stretch">stretch</option>
                                            </select>
                                        </div>

                                        <div className="input-child">
                                            <label>Align Items</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.alignItems || "stretch"}
                                                onChange={(e) =>
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ??= {};
                                                        node.defaultProps.style.alignItems = e.target.value;
                                                    })
                                                }
                                            >
                                                <option value="start">start</option>
                                                <option value="center">center</option>
                                                <option value="end">end</option>
                                                <option value="stretch">stretch</option>
                                            </select>
                                        </div>
                                    </div>
                                </Heading>
                            )}


                            <Heading icon={<Space size={18} />} title={'Spacing'} >
                                <div className="spacing-content">
                                    <FourSideInput
                                        label="Padding"
                                        names={["Top", "Right", "Bottom", "Left"]}
                                        values={[
                                            parseInt(selectedComponent.defaultProps?.style?.paddingTop) || 0,
                                            parseInt(selectedComponent.defaultProps?.style?.paddingRight) || 0,
                                            parseInt(selectedComponent.defaultProps?.style?.paddingBottom) || 0,
                                            parseInt(selectedComponent.defaultProps?.style?.paddingLeft) || 0,
                                        ]}
                                        onChange={(index, value) => {
                                            updateComponent(selectedComponent.id, (node) => {
                                                const map = [
                                                    "paddingTop",
                                                    "paddingRight",
                                                    "paddingBottom",
                                                    "paddingLeft",
                                                ];

                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};

                                                const actualValue = String(value).replace("px", "");

                                                node.defaultProps.style[map[index]] = `${actualValue}px`;
                                            });
                                        }}
                                    />
                                    <FourSideInput
                                        label="Margin"
                                        names={["Top", "Right", "Bottom", "Left"]}
                                        values={[
                                            parseInt(selectedComponent.defaultProps?.style?.marginTop) || 0,
                                            parseInt(selectedComponent.defaultProps?.style?.marginRight) || 0,
                                            parseInt(selectedComponent.defaultProps?.style?.marginBottom) || 0,
                                            parseInt(selectedComponent.defaultProps?.style?.marginLeft) || 0,
                                        ]}
                                        onChange={(index, value) => {
                                            updateComponent(selectedComponent.id, (node) => {
                                                const map = [
                                                    "marginTop",
                                                    "marginRight",
                                                    "marginBottom",
                                                    "marginLeft",
                                                ];

                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};

                                                const actualValue = String(value).replace("px", "");

                                                node.defaultProps.style[map[index]] = `${actualValue}px`;
                                            });
                                        }}
                                    />
                                </div>
                            </Heading>

                            <Heading icon={<Grid2x2 size={18} />} title={'Border'}>
                                <div className="border">
                                    <div className="border-properties">
                                        <div className='border-prop'>
                                            <label htmlFor="">Width</label>
                                            <input
                                                type="number"
                                                min={0}
                                                value={parseFloat(selectedComponent.defaultProps?.style?.borderWidth)}
                                                onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ??= {};
                                                        node.defaultProps.style.borderWidth = `${e.target.value}px`;
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className='border-prop'>
                                            <label htmlFor="">Style</label>
                                            <select value={selectedComponent.defaultProps?.style?.borderStyle} onChange={(e) => {
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.borderStyle = e.target.value;
                                                })
                                            }}>
                                                <option value="solid">solid</option>
                                                <option value="dashed">dashed</option>
                                                <option value="dotted">dotted</option>
                                                <option value="double">double</option>
                                                <option value="none">none</option>
                                            </select>
                                        </div>
                                    </div>
                                    <ColorPalette
                                        value={selectedComponent.defaultProps?.style?.borderColor}
                                        onChange={(v) =>
                                            updateComponent(selectedComponent.id, (node) => {
                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};
                                                node.defaultProps.style.borderColor = v;
                                            })
                                        }
                                    />

                                    <FourSideInput
                                        label="Border Radius"
                                        names={["Top", "Right", "Bottom", "Left"]}
                                        values={[
                                            parseInt(selectedComponent.defaultProps?.style?.borderTopLeftRadius) || 0,
                                            parseInt(selectedComponent.defaultProps?.style?.borderTopRightRadius) || 0,
                                            parseInt(selectedComponent.defaultProps?.style?.borderBottomRightRadius) || 0,
                                            parseInt(selectedComponent.defaultProps?.style?.borderBottomLeftRadius) || 0,
                                        ]}
                                        onChange={(index, value) => {
                                            updateComponent(selectedComponent.id, (node) => {
                                                const map = [
                                                    "borderTopLeftRadius",
                                                    "borderTopRightRadius",
                                                    "borderBottomRightRadius",
                                                    "borderBottomLeftRadius",
                                                ];

                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};

                                                const actualValue = String(value).replace("px", "");

                                                node.defaultProps.style[map[index]] = `${actualValue}px`;
                                            });
                                        }}
                                    />
                                </div>
                            </Heading>

                            <Heading icon={<MountainSnow size={18} />} title={'Background'}>
                                <div className='background-content'>
                                    <label htmlFor="">Background color</label>
                                    <ColorPalette
                                        value={selectedComponent.defaultProps?.style?.backgroundColor ?? "#000000"}
                                        onChange={(v) =>
                                            updateComponent(selectedComponent.id, (node) => {
                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};
                                                node.defaultProps.style.backgroundColor = v;
                                            })
                                        }
                                    />
                                    <SliderInput label={'opacity'} value={Number((selectedComponent.defaultProps?.style?.opacity ?? 1) * 100).toFixed(0)} min={0} max={100} unit='%' onChange={(v) => {
                                        updateComponent(selectedComponent.id, (node) => {
                                            node.defaultProps ??= {};
                                            node.defaultProps.style ??= {};
                                            node.defaultProps.style.opacity = v / 100;
                                        });
                                    }} />
                                    <ImageUpload selectedComponent={selectedComponent} updateComponent={updateComponent} />
                                    <div className="three-input">
                                        <div>
                                            <label htmlFor="">bg-Repeat</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.backgroundRepeat || 'repeat'}
                                                onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ??= {};
                                                        node.defaultProps.style.backgroundRepeat = e.target.value;
                                                    })
                                                }}
                                            >
                                                <option value="repeat">Repeat</option>
                                                <option value="no-repeat">No-repeat</option>
                                                <option value="repeat-X">Repeat-X</option>
                                                <option value="repeat-Y">Repeat-Y</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="">bg-position</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.backgroundPosition || 'center'}
                                                onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ?? - {};
                                                        node.defaultProps.style.backgroundPosition = e.target.value;
                                                    })
                                                }}
                                            >
                                                <option value="center">Center</option>
                                                <option value="top">Top</option>
                                                <option value="bottom">Bottom</option>
                                                <option value="left">Left</option>
                                                <option value="right">Right</option>

                                                <option value="top left">Top Left</option>
                                                <option value="top center">Top Center</option>
                                                <option value="top right">Top Right</option>
                                                <option value="center left">Center Left</option>
                                                <option value="center right">Center Right</option>
                                                <option value="bottom left">Bottom Left</option>
                                                <option value="bottom center">Bottom Center</option>
                                                <option value="bottom right">Bottom Right</option>

                                                <option value="0% 0%">0% 0%</option>
                                                <option value="50% 50%">50% 50%</option>
                                                <option value="100% 100%">100% 100%</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="">bg-size</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.backgroundSize || 'auto'}
                                                onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ??= {};
                                                        node.defaultProps.style.backgroundSize = e.target.value;
                                                    })
                                                }}
                                            >
                                                <option value="auto">Auto</option>
                                                <option value="cover">Cover</option>
                                                <option value="contain">Contain</option>
                                                <option value="100% 100%">Stretch</option>
                                                <option value="50%">50%</option>
                                                <option value="75%">75%</option>
                                                <option value="25%">25%</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="three-input">
                                        <div>
                                            <label htmlFor="">bg-origin</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.backgroundOrigin || 'repeat'}
                                                onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ??= {};
                                                        node.defaultProps.style.backgroundOrigin = e.target.value;
                                                    })
                                                }}
                                            >
                                                <option value="padding-box">padding-box</option>
                                                <option value="border-box">border-box</option>
                                                <option value="content-box">content-box</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="">bg-clip</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.backgroundClip || 'center'}
                                                onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ?? - {};
                                                        node.defaultProps.style.backgroundClip = e.target.value;
                                                    })
                                                }}
                                            >
                                                <option value="border-box">border-box</option>
                                                <option value="padding-box">padding-box</option>
                                                <option value="content-box">content-box</option>
                                                <option value="text">text</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="">bg-attachment</label>
                                            <select
                                                value={selectedComponent.defaultProps?.style?.backgroundAttachment || 'auto'}
                                                onChange={(e) => {
                                                    updateComponent(selectedComponent.id, (node) => {
                                                        node.defaultProps ??= {};
                                                        node.defaultProps.style ??= {};
                                                        node.defaultProps.style.backgroundAttachment = e.target.value;
                                                    })
                                                }}
                                            >
                                                <option value="scroll">scroll</option>
                                                <option value="fixed">fixed</option>
                                                <option value="local">local</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </Heading>



                            <Heading icon={<Type size={18} />} title={'Typography'} >
                                <div className="typo">
                                    <div className="double-input">
                                        <div className='input-child'>
                                            <label htmlFor="">Font Size</label>
                                            <input type="number" max={72} value={parseFloat(selectedComponent.defaultProps?.style?.fontSize) || 16} onChange={(e) => {
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.fontSize = `${e.target.value}px`
                                                })
                                            }} />
                                        </div>
                                        <div className='input-child'>
                                            <label htmlFor="">Font Weight</label>
                                            <select value={selectedComponent.defaultProps?.style?.fontWeight || 400} onChange={(e) => {
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.fontWeight = `${e.target.value}`
                                                })
                                            }}>  +77.0°C
                                                <option value="100">100</option>
                                                <option value="200">200</option>
                                                <option value="300">300</option>
                                                <option value="400">400</option>
                                                <option value="500">500</option>
                                                <option value="600">600</option>
                                                <option value="700">700</option>
                                                <option value="800">800</option>
                                                <option value="900">900</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="color">
                                        <label htmlFor="" id='text-color'>Text color</label>
                                        <ColorPalette
                                            value={selectedComponent.defaultProps?.style?.color || "#000000"}
                                            onChange={(v) =>
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.color = v;
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="double-input">
                                        <div className='input-child'>
                                            <label htmlFor="">Text Align</label>
                                            <select value={selectedComponent.defaultProps?.style?.textAlign || "left"} onChange={(e) => {
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.textAlign = e.target.value;
                                                })
                                            }}>
                                                <option value="left">left</option>
                                                <option value="center">center</option>
                                                <option value="right">right</option>
                                                <option value="justify">justify</option>
                                            </select>
                                        </div>
                                        <div className='input-child'>
                                            <label htmlFor="">Line Height</label>
                                            <input type="number" value={selectedComponent.defaultProps?.style?.lineHeight || 1} onChange={(e) => {
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.lineHeight = e.target.value;
                                                })
                                            }} />
                                        </div>
                                    </div>
                                    <div className="font-input">
                                        <label htmlFor="">Font family</label>
                                        <select
                                            value={selectedComponent.defaultProps?.style?.fontFamily || ""}

                                            onChange={(e) => {
                                                const font = e.target.value;

                                                WebFont.load({
                                                    google: { families: [font] }
                                                })

                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.fontFamily = e.target.value;
                                                })
                                            }}
                                        >
                                            <option value="">Default</option>
                                            <option value="Roboto">Roboto</option>
                                            <option value="Poppins">Poppins</option>
                                            <option value="Open Sans">Open Sans</option>
                                            <option value="Montserrat">Montserrat</option>
                                            <option value="Inter">Inter</option>
                                            <option value="Lato">Lato</option>
                                            <option value="Nunito">Nunito</option>
                                            <option value="Raleway">Raleway</option>
                                            <option value="Playfair Display">Playfair Display</option>
                                            <option value="Ubuntu">Ubuntu</option>
                                        </select>
                                    </div>
                                </div>
                            </Heading>


                            <Heading icon={<TableRowsSplit size={18} />} title={'Effects'}>
                                <div className="effects-content">
                                    <FourSideInput
                                        label="Box Shadow"
                                        names={["X", "Y", "Blur", "Spread"]}
                                        values={[
                                            selectedComponent.defaultProps?.style?.boxShadowX ?? 0,
                                            selectedComponent.defaultProps?.style?.boxShadowY ?? 0,
                                            selectedComponent.defaultProps?.style?.boxShadowBlur ?? 0,
                                            selectedComponent.defaultProps?.style?.boxShadowSpread ?? 0,
                                        ]}
                                        onChange={(index, value) => {
                                            updateComponent(selectedComponent.id, (node) => {
                                                const shadow = {
                                                    x: node.defaultProps?.style?.boxShadowX ?? 0,
                                                    y: node.defaultProps?.style?.boxShadowY ?? 0,
                                                    blur: node.defaultProps?.style?.boxShadowBlur ?? 0,
                                                    spread: node.defaultProps?.style?.boxShadowSpread ?? 0,
                                                    color: node.defaultProps?.style?.boxShadowColor ?? "rgba(0,0,0,0.25)",
                                                };

                                                const map = ["x", "y", "blur", "spread"];
                                                shadow[map[index]] = value;
                                                node.defaultProps ??= {};
                                                node.defaultProps.style ??= {};
                                                node.defaultProps.style.boxShadowX = shadow.x;
                                                node.defaultProps.style.boxShadowY = shadow.y;
                                                node.defaultProps.style.boxShadowBlur = shadow.blur;
                                                node.defaultProps.style.boxShadowSpread = shadow.spread;

                                                node.defaultProps.style.boxShadow =
                                                    `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
                                            });
                                        }}
                                    />

                                    <div className="color">
                                        <label htmlFor="" id='text-color'>Shadow color</label>
                                        <ColorPalette
                                            value={selectedComponent.defaultProps?.style?.boxShadowColor || "#000000"}
                                            onChange={(v) =>
                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    const shadow = node.defaultProps.style.boxShadow || "0px 4px 10px #000";
                                                    const parts = shadow.split(" ");
                                                    parts[parts.length - 1] = v;

                                                    node.defaultProps.style.boxShadow = parts.join(" ");
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="scale">
                                    <div>
                                        <label>Scale</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min={0}
                                            value={selectedComponent.defaultProps?.style?.scale ?? 1}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);

                                                updateComponent(selectedComponent.id, (node) => {
                                                    node.defaultProps ??= {};
                                                    node.defaultProps.style ??= {};
                                                    node.defaultProps.style.scale = val;
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                            </Heading>
                        </div>
                    )}
                    {activeTab === 'resources' && (
                        <div className="properties-content">
                            <Heading icon={<FileUp size={18} />} title={'External Data Source'} >
                                <FileUpload onFilesAdded={handleFiles} />
                                <ImportedFiles files={files} />
                            </Heading>
                            <Heading icon={<Database size={18} />} title={'Database Connection'} >
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
                            </Heading>

                            <Heading icon={<Webhook size={18} />} title={'API Connection'} >
                                <div className="api-connection">
                                    <div className="api-row">
                                        <div className='api-text'>
                                            <span className='api-icon'><Cloud size={28} /></span>
                                            <div>
                                                <p>User API</p>
                                                <p className='link'>https://api.users.com</p>
                                            </div>
                                        </div>
                                        <div className='green-dot'>

                                        </div>
                                    </div>
                                </div>
                                <div className="api-form">
                                    <label>API Endpoint</label>

                                    <input
                                        type="text"
                                        placeholder="https://api.example.com/data"
                                        value={apiUrl}
                                        onChange={(e) => setApiUrl(e.target.value)}
                                    />

                                    <button
                                        className="api-button"
                                        onClick={fetchApiData}
                                    >
                                        {loadingApi ? "Fetching..." : "Fetch Data"}
                                    </button>
                                </div>
                            </Heading>
                        </div>
                    )}
                </div>
            </div >
            <div className="delete-box">
                <button
                    className="delete-button"
                    onClick={deleteComponent}
                    disabled={!selectedComponent}
                >
                    Delete {selectedComponent.label}
                </button>
            </div>
        </aside >
    )
}

const Heading = ({ icon, title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="properties-section">
            <button
                className="properties-toggle"
                onClick={() => setOpen(prev => !prev)}
                type="button"
            >
                <div>
                    <span className="btn-icon">{icon}</span>
                    <span className='title'>{title}</span>
                </div>

                <span>
                    {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}

                </span>
            </button>

            {open && (
                <div className="properties-body">
                    {children}
                </div>
            )}
        </div>
    );
};

const FourSideInput = ({ label, values = [0, 0, 0, 0], names, onChange }) => {
    const labelNames = names;

    return (
        <div className="four-side">
            <label className="four-side-title">{label}</label>

            <div className="four-side-grid">
                {values.map((val, index) => (
                    <div key={index}>
                        <span>{labelNames[index]}</span>
                        <input
                            type="number"
                            value={val}
                            min={0}
                            onChange={(e) =>
                                onChange(index, e.target.value)
                            }
                        />
                    </div>
                ))}
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
                    min={0}
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
                    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
                    <span className="slider-value">{value}{unit}</span>
                </div>
            </div>
        </>
    )
}

const GridTemplateInput = ({ label, value, onChange }) => {
    return (
        <div className="long-input">
            <label>{label}</label>
            <input
                className='grid-input'
                type="text"
                placeholder="e.g. repeat(3, 1fr)"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

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

const splitValue = (val) => {
    if (!val) return { number: "", unit: "px" };

    if (val === "auto") {
        return { number: "", unit: "auto" };
    }

    const match = val.match(/^([\d.]+)(px|%|rem|em|vw|vh)$/);

    if (!match) {
        return { number: "", unit: "px" };
    }

    return {
        number: match[1],
        unit: match[2],
    };
};

const SizeInput = ({ label, value, onChange }) => {
    const { number, unit } = splitValue(value);

    const update = (num, un) => {
        if (un === "auto") return onChange("auto");
        if (!num) return onChange(`0${un}`);
        onChange(`${num}${un}`);
    };

    return (
        <div className="long-input">
            <label>{label}</label>

            <div>
                <input
                    type="number"
                    min={0}
                    value={number}
                    disabled={unit === "auto"}
                    onChange={(e) => update(e.target.value, unit)}
                />

                <select
                    value={unit}
                    onChange={(e) => update(number, e.target.value)}
                >
                    {UNITS.map((u) => (
                        <option key={u} value={u}>
                            {u}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};



export default RightSideBar