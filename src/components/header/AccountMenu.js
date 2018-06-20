import { AccessibleFakeButton, Avatar, DropdownMenu, FontIcon, IconSeparator, ListItem } from "react-md";
import React from "react";
import { withRouter } from "react-router-dom";
import UserService from "../../services/UserService";

class AccountMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };
    }

    logout() {
        UserService.logout();
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };
        if(this.props.location.pathname !== '/') {
            this.props.history.push('/');
        }
        else {
            window.location.reload();
        }
    }

    render() {
        return (
            <DropdownMenu
                id="account-nav"
                menuItems={<ListItem key={1} primaryText="Logout" onClick={() => this.logout()} />}
                anchor={{
                    x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
                    y: DropdownMenu.VerticalAnchors.BOTTOM,
                }}
                position={DropdownMenu.Positions.BELOW}
            >
                <AccessibleFakeButton
                    component={IconSeparator}
                    iconBefore
                    label={
                        <IconSeparator label={this.state.user.username}>
                            <FontIcon>arrow_drop_down</FontIcon>
                        </IconSeparator>
                    }
                >
                    <Avatar suffix="pink">{(this.state.user.username).substr(0, 1)}</Avatar>
                </AccessibleFakeButton>
            </DropdownMenu>
        )
    }
}

export default withRouter(AccountMenu);