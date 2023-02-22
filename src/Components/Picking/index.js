//React
import React, { useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Picking.css';

// API
import { getPickings } from "../../ServicesConsumers/picking";
import { getInfoIndicators } from '../../ServicesConsumers/saleorder';
import { getInfoReferencesRequest } from "../../ServicesConsumers/saleorder";

// components
import { InfoSaleOrder } from '../Picking/InfoSaleOrder';
import { GetSaleOrder } from './GetSaleOrder';
import { ModalSaleOrder } from './ModalSaleOrder';
import { PickingList } from '../Picking/PickingList';
import { PickingIndicatorsList } from './PickingIndicatorsList';
import { PickingContain } from "./PickingContain";
import { PickingControl } from '../Picking/PickingControl';
import { PickingItem } from './PickingItem';
import { PickingMonitor } from "../PickingMonitor";
import { PickingIndicator } from './PickingIndicator';
import { SaleOrderControl } from '../Picking/SaleOrderControl';
import { SaleOrderItem } from "./SaleOrderItem";

// Context
import { usePicking } from "../../Context/picking-context";
import { useSaleOrder } from "../../Context/saleorder-context";
import { useBoxItem } from "../../Context/boxitem-context";

// Other
import { dataIndicator } from "./PickingIndicator/data-indicator";
import { AppUI } from "../AppUI";

export const Picking = () => {

    // Context 

    const {
        saleOrder,
        noSaleOrder,
        saleOrderModal,
        referencesRequest,
        setReferencesRequest,
        loadGetBoxesSaleOrderItems,
        setLoadedSaleOrderItems
    } = useSaleOrder();

    const {
        openPickingMonitor,
        setPickings,
        setLoadedPicking,
        loadGetBoxesPicking,
        pickings,
        indicatorsPicking,
        setIndicatorsPicking
    } = usePicking();

    const {
        listBoxItems
    } = useBoxItem();

    // useEffect

    useEffect(() => {
        getInfoIndicators(saleOrder.customer_name, noSaleOrder, setIndicatorsPicking);
    }, [saleOrder, listBoxItems])

    useEffect(() => {
        getPickings(setPickings, setLoadedPicking, noSaleOrder);
        getInfoReferencesRequest(setLoadedSaleOrderItems, setReferencesRequest, noSaleOrder)
    }, [saleOrder])

    // Render

    const dataIndicatorCustomer = dataIndicator(indicatorsPicking.picking_quantity_by_customer, indicatorsPicking.request_quantity_by_customer)
    const dataIndicatorSaleOrder = dataIndicator(indicatorsPicking.picking_quantity_by_saleorder, indicatorsPicking.request_quantity_by_saleorder)

    return (
        <React.Fragment>
            <AppUI>
                <TransitionGroup>
                    {!!saleOrderModal && (
                        <CSSTransition
                            classNames="saleorder"
                            timeout={300}
                        >
                            <ModalSaleOrder>
                                <TransitionGroup>
                                    {loadGetBoxesSaleOrderItems && referencesRequest.map((reference) => (
                                        <CSSTransition key={reference.id} timeout={500} classNames="fade">
                                            <SaleOrderItem
                                                key={reference.id}
                                                id={reference.id}
                                                reference={reference.reference}
                                                balance={"8/8"}
                                                quantity={reference.quantity}
                                                modelsize={reference.modelsize}
                                                color={reference.color}
                                            />
                                        </CSSTransition>
                                    ))}
                                </TransitionGroup>
                                {!loadGetBoxesSaleOrderItems && <SaleOrderItem id={"Cargando ..."} />}
                            </ModalSaleOrder>
                        </CSSTransition>
                    )}
                </TransitionGroup>

                <TransitionGroup>
                    {!!openPickingMonitor && (
                        <CSSTransition
                            classNames="picking-monitor"
                            timeout={300}
                        >
                            <PickingMonitor/>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                <PickingContain>
                    <SaleOrderControl>
                        <GetSaleOrder />
                        <InfoSaleOrder />
                    </SaleOrderControl>
                    <PickingControl>
                        <PickingList>
                            <TransitionGroup>
                                    {loadGetBoxesPicking && pickings.map((picking) => (
                                        <CSSTransition key={picking.id} timeout={500} classNames="fade">
                                            <PickingItem
                                                key={picking.id}
                                                id={picking.id}
                                                status={picking.status}
                                                responsible={picking.responsible}
                                                dateModified={(picking.last_modification).substring(5, 16).replace("-", "/")}
                                            />
                                        </CSSTransition>
                                    ))}
                            </TransitionGroup>
                            {!loadGetBoxesPicking && <PickingItem id={"Cargando ..."} />}
                        </PickingList>
                        <PickingIndicatorsList>
                            <PickingIndicator dataIndicator={dataIndicatorSaleOrder} key={"saleorder"} nameIndicator={"Orden de Venta"} />
                            <PickingIndicator dataIndicator={dataIndicatorCustomer} key={"customer"} nameIndicator={"Cliente"} />
                        </PickingIndicatorsList>
                    </PickingControl>
                </PickingContain>
            </AppUI>
        </React.Fragment>
    );
}