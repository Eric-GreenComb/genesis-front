// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { getTableStruct } from 'modules/admin/actions';
import { ITableResponse } from 'lib/api';

import EditTable from 'components/Main/Admin/Tables/EditTable';

export interface IEditTableContainerProps {
    vde?: boolean;
    match: { params: { tableName: string } };
}

interface IEditTableContainerState {
    table: ITableResponse;
}

interface IEditTableContainerDispatch {
    getTableStruct: typeof getTableStruct.started;
}

class EditTableContainer extends React.Component<IEditTableContainerProps & IEditTableContainerState & IEditTableContainerDispatch> {
    componentWillMount() {
        this.props.getTableStruct({
            name: this.props.match.params.tableName,
            vde: this.props.vde
        });
    }

    render() {
        return (
            <EditTable {...this.props} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    table: state.admin.table
});

const mapDispatchToProps = {
    getTableStruct: getTableStruct.started
};

export default connect<IEditTableContainerState, IEditTableContainerDispatch, IEditTableContainerProps>(mapStateToProps, mapDispatchToProps)(EditTableContainer);