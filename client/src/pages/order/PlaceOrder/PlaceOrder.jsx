import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Greet from "../Greet/Greet";
import { InputSwitch } from "primereact/inputswitch";
import PlacedOrderItem from "./PlacedOrderItem";
import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";

export default function PlaceOrder({ selectedOrder, setSelectedOrder }) {
    const [checked, setChecked] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [missingFields, setMissingFields] = useState([]);
    const itemTotal = selectedOrder.reduce((total, item) => total + item.price * item.order, 0);
    const deliveryCharges = checked ? 50 : 0;
    const tax = ((itemTotal + deliveryCharges) * 0.18);
    const grandTotal = itemTotal + deliveryCharges + tax;

    const [userDetails, setUserDetails] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const handlePlaceOrder = () => {
        const required = ["name", "phone"];
        if (checked) required.push("address");
        const missing = required.filter((f) => !userDetails[f]);
        if (missing.length > 0) {
            setMissingFields(missing);
            setShowDialog(true);
            return;
        }
        // Place order logic here
        alert("Order placed!");
    };

    const handleDialogSubmit = () => {
        const required = ["name", "phone"];
        if (checked) required.push("address");
        const missing = required.filter((f) => !userDetails[f]);
        if (missing.length === 0) {
            setShowDialog(false);
            // Do not place order here, just close dialog
        }
    };

    // Helper to check if user details are filled as per order type
    const isUserDetailsFilled = () => {
        if (checked) {
            return userDetails.name && userDetails.phone && userDetails.address;
        } else {
            return userDetails.name && userDetails.phone;
        }
    };

    const swipeRef = useRef(null);
    const [swipePercent, setSwipePercent] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    // Swipe handlers
    const handleSwipeStart = (e) => {
        setIsSwiping(true);
    };
    const handleSwipeMove = (e) => {
        if (!isSwiping) return;
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const rect = swipeRef.current.getBoundingClientRect();
        let percent = ((clientX - rect.left) / rect.width) * 100;
        percent = Math.max(0, Math.min(100, percent));
        setSwipePercent(percent);
    };
    const handleSwipeEnd = () => {
        setIsSwiping(false);
        if (swipePercent > 85) {
            setSwipePercent(100);
            handlePlaceOrder();
            setTimeout(() => setSwipePercent(0), 800);
        } else {
            setSwipePercent(0);
        }
    };

    return (
        <>
            <div className="OrderHeader">
                <Greet />
                <div className="OrderSearch">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText
                            style={{
                                width: "100%",
                                height: "2.5rem",
                                background: "var(--inputBackground)",
                            }}
                            placeholder="Search"
                        />
                    </IconField>
                </div>
            </div>
            <div className="PlacedOrderContainer">
                {
                    selectedOrder.map((item) => {
                        return (
                            <PlacedOrderItem
                                key={item.id}
                                item={item}
                                setSelectedOrder={setSelectedOrder}
                            />
                        )
                    })
                }
            </div>

            <div className="PlacedOrderType">
                <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
            </div>

            <div className="PlacedOrderInfo">
                <div className="PlacedInfoDetail">
                    <span>Item Total</span>
                    <span>₹{itemTotal.toFixed(2)}</span>
                </div>
                <div className="PlacedInfoDetail">
                    <span>Delivery Charges</span>
                    <span>₹{deliveryCharges.toFixed(2)}</span>
                </div>
                <div className="PlacedInfoDetail">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="GrandTotal">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="UserDetailsSection" style={{ margin: '1rem 0', padding: '1rem', background: '#f8f8f8', borderRadius: '8px' }}>
                {isUserDetailsFilled() ? (
                    <div>
                        <div><b>Name:</b> {userDetails.name}</div>
                        <div><b>Phone:</b> {userDetails.phone}</div>
                        {checked && <div><b>Address:</b> {userDetails.address}</div>}
                        <Button label="Edit Details" size="small" className="p-button-text p-ml-2" onClick={() => setShowDialog(true)} style={{ marginTop: '0.5rem' }} />
                    </div>
                ) : (
                    <Button label="Add Details" icon="pi pi-user-edit" onClick={() => setShowDialog(true)} />
                )}
            </div>

            {/* Swipe to Order UI */}
            <div
                ref={swipeRef}
                className="swipe-to-order-container"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 350,
                    margin: '2rem auto 0',
                    height: 56,
                    background: '#eee',
                    borderRadius: 32,
                    overflow: 'hidden',
                    userSelect: 'none',
                    boxShadow: '0 2px 8px #0001',
                }}
                onMouseDown={handleSwipeStart}
                onMouseMove={handleSwipeMove}
                onMouseUp={handleSwipeEnd}
                onMouseLeave={handleSwipeEnd}
                onTouchStart={handleSwipeStart}
                onTouchMove={handleSwipeMove}
                onTouchEnd={handleSwipeEnd}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${swipePercent}%`,
                        background: '#4caf50',
                        borderRadius: 32,
                        transition: isSwiping ? 'none' : 'width 0.3s',
                        zIndex: 1,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        left: `${swipePercent}%`,
                        top: 0,
                        bottom: 0,
                        width: 56,
                        background: '#fff',
                        borderRadius: '50%',
                        boxShadow: '0 2px 8px #0002',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 20,
                        color: '#4caf50',
                        cursor: 'pointer',
                        zIndex: 2,
                        transition: isSwiping ? 'none' : 'left 0.3s',
                    }}
                >
                    <span className="pi pi-arrow-right" />
                </div>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        color: swipePercent > 50 ? '#fff' : '#333',
                        zIndex: 0,
                        pointerEvents: 'none',
                        fontSize: 18,
                    }}
                >
                    {swipePercent > 85 ? 'Release to Order' : 'Swipe to Order'}
                </div>
            </div>

            <Dialog header="Enter your details" visible={showDialog} style={{ width: '350px' }} onHide={() => setShowDialog(false)}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" value={userDetails.name} onChange={e => setUserDetails({ ...userDetails, name: e.target.value })} className={missingFields.includes("name") ? "p-invalid" : ""} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="phone">Phone</label>
                        <InputText id="phone" value={userDetails.phone} onChange={e => setUserDetails({ ...userDetails, phone: e.target.value })} className={missingFields.includes("phone") ? "p-invalid" : ""} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="address">Address</label>
                        <InputText id="address" value={userDetails.address} onChange={e => setUserDetails({ ...userDetails, address: e.target.value })} className={missingFields.includes("address") ? "p-invalid" : ""} disabled={!checked} />
                    </div>
                    <Button label="Submit" onClick={handleDialogSubmit} className="p-mt-2" />
                </div>
            </Dialog>
        </>
    );
}
