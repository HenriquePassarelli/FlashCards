import { Dispatch, SetStateAction } from 'react'
import { Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";

type Props = {
    logout: () => void
    setSettingsOpen: Dispatch<SetStateAction<boolean>>
}

const Header = ({ logout, setSettingsOpen }: Props): JSX.Element => {

    return (<Navbar className="justify-content-between" >
        <h1 className="text-light">Flash card</h1>
        <Navbar.Text >
            <>
                <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-${"bottom"}`}>
                            Settings
                        </Tooltip>
                    }
                >
                    <span onClick={() => setSettingsOpen(true)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" /></svg>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-${"bottom"}`}>
                            Exit
                        </Tooltip>
                    }
                >
                    <span onClick={() => {
                        logout()
                    }} style={{ cursor: 'pointer' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" /></g></svg>
                    </span>
                </OverlayTrigger>
            </>
        </Navbar.Text>
    </Navbar>)
}

export default Header