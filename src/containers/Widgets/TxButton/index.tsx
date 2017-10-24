// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import * as uuid from 'uuid';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { navigate } from 'modules/engine/actions';
import { contractExec } from 'modules/tx/actions';
import { alertShow } from 'modules/content/actions';

import TxButton, { ITxButtonConfirm } from 'components/TxButton';

interface ITxButtonContainerProps {
    bsStyle?: string;
    className?: string;
    contractName?: string;
    contractParams?: { [name: string]: any };
    confirm?: ITxButtonConfirm;
    page?: string;
    pageParams?: { [key: string]: any };
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onExec?: (block: string, error: string) => void;
}

interface ITxButtonStateProps {
    transactions: Map<string, { block: string, error: string }>;
    confirmation: { id: string, success: string, error: string };
}

interface ITxButtonDispatchProps {
    contractExec: typeof contractExec.started;
    alertShow: typeof alertShow;
    navigate: typeof navigate;
}

class TxButtonContainer extends React.Component<ITxButtonContainerProps & ITxButtonStateProps & ITxButtonDispatchProps> {
    private _uuid: string;

    componentWillReceiveProps(props: ITxButtonContainerProps & ITxButtonStateProps & ITxButtonDispatchProps) {
        if (props.confirmation && props.confirmation.id === this._uuid && props.confirmation.success) {
            this._uuid = uuid.v4();

            if (this.props.contractName) {
                this.onExecContract(this.props.contractName, this.props.contractParams);
            }
            else if (this.props.page) {
                this.onNavigate(this.props.page, this.props.pageParams);
            }
        }
    }

    onExecContract(name: string, params: { [key: string]: any }, confirm?: ITxButtonConfirm) {
        this._uuid = uuid.v4();

        if (confirm) {
            this.props.alertShow({
                id: this._uuid,
                type: confirm.icon,
                title: confirm.title,
                text: confirm.text,
                confirmButton: confirm.confirmButton,
                cancelButton: confirm.cancelButton
            });
        }
        else {
            this.props.contractExec({
                uuid: this._uuid,
                name: this.props.contractName,
                params: this.props.contractParams,
            });
        }
    }

    onNavigate(page: string, params: { [key: string]: any }, confirm?: ITxButtonConfirm) {
        this._uuid = uuid.v4();

        if (confirm) {
            this.props.alertShow({
                id: this._uuid,
                type: confirm.icon,
                title: confirm.title,
                text: confirm.text,
                confirmButton: confirm.confirmButton,
                cancelButton: confirm.cancelButton
            });
        }
        else {
            // TODO: Missing params
            this.props.navigate(`/page/${page}`);
        }
    }

    render() {
        const transaction = this.props.transactions.get(this._uuid);
        const pending = transaction && !transaction.block && !transaction.error;

        return (
            <TxButton
                {...this.props}
                bsStyle={this.props.bsStyle}
                pending={pending}
                className={this.props.className}
                contractName={this.props.contractName}
                contractParams={this.props.contractParams}
                contractStatus={this.props.transactions.get(this._uuid)}
                execContract={this.onExecContract.bind(this)}
                onExec={this.props.onExec}
                navigate={this.onNavigate.bind(this)}
            >
                {this.props.children}
            </TxButton>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    transactions: state.tx.transactions,
    confirmation: state.content.alert
});

const mapDispatchToProps = {
    contractExec: contractExec.started,
    alertShow,
    navigate
};

export default connect<ITxButtonStateProps, ITxButtonDispatchProps, ITxButtonContainerProps>(mapStateToProps, mapDispatchToProps)(TxButtonContainer);