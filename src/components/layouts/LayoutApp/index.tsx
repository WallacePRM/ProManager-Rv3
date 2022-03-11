import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPlus, faQuestion, faSearch } from "@fortawesome/free-solid-svg-icons";
import userImg from '../../../assets/img/user-profile.svg';
import appLogo from '../../../assets/img/logo-black.png';
import LoadPage from "../../LoadPage";
import { useAppSelector } from "../../../store/hooks";
import { selectLoadPage } from "../../../store/loadPage";
import './index.css';

const LayoutApp = (props: LayoutAppProps) => {

    const loadPageVisible: boolean = useAppSelector(selectLoadPage);
    // // const dispatch = useAppDispatch();
    // dispatch(showLoadPage())

    return (
        <>
            {loadPageVisible ? <LoadPage/> : null}

            <div className="app">
                <div className="main-container">
                   {props.children}
                </div>
            </div>
        </>
    );
};

LayoutApp.Header = (props: HeaderProps) => {

    return (
        <header className="app-header">
            <div className="app-nav">
                {props.onBackClick ? <FontAwesomeIcon onClick={props.onBackClick} className="app-header-back-icon" icon={faAngleLeft}/> : <img src={appLogo}/>}
                <div className="app-logo">
                    <h1>{props.title}</h1>
                    {props.tabs}
                </div>
            </div>
            <ul className="app-actions">
                <li className="app-actions-item search-field">
                    <FontAwesomeIcon className="search-icon" icon={faSearch}/>
                    <input type="text"/>
                </li>
                <li onClick={props.onBtnPlusClick} className="app-actions-item app-new-project">
                    <FontAwesomeIcon icon={faPlus}/>
                </li>
                <li className="app-actions-item app-user-info">
                    <img src={userImg}/>
                </li>
            </ul>
        </header>
    );
};

type HeaderProps = {
    tabs?: React.ReactElement,
    title: string,
    onBtnPlusClick?: () => void;
    onBackClick?: () => void
};

LayoutApp.HeaderTabs = (props: HeaderTabsProps) => {

    const [ activeTabId, setActiveTabId ] = useState<any>(props.initialTab);
    const getHandleChangeTab = (tab: TabItem) => (e: React.MouseEvent) => {

        setActiveTabId(tab.id);
        props.onTabChange && props.onTabChange(tab);
    };

    return (
        <nav className="app-nav-list">
            {props.tabs.map((tab) =>
                <a key={tab.id} onClick={getHandleChangeTab(tab)} className={"app-nav-item" + (activeTabId === tab.id ? ' active' : '')}>
                    <label>{tab.label}</label>
                    { tab.count !== undefined ? <span className="nav-item-count">{tab.count}</span> : null }
                </a>
            )}
        </nav>
    );
};

type HeaderTabsProps = {
    onTabChange?: (tab: TabItem) => void;
    tabs: Array<TabItem>;
    initialTab: any
};

export type TabItem = {
    id: any,
    label: string,
    count?: number
};

LayoutApp.Content = (props: {children: React.ReactElement}) => {
    return (
        <div className="app-content">
            {props.children}
        </div>
    );
};

// TYPES
type LayoutAppProps = {
    title?: string;
    children: React.ReactElement;
};

export enum Tabs {
    All,
    InProgress,
    Completed
}

export default LayoutApp;