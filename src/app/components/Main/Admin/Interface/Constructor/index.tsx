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
import styled from 'styled-components';

import Protypo from 'containers/Widgets/Protypo';
import Layout from './Layout';
import EditPage from 'components/Main/Admin/Interface/EditPage';

import Panel from './Panel';

import SourceElements from './SourceElements';
import Properties from './Properties';
import Switch from './Switch';
import Tree from './Tree';

import TreeTheme from './Tree/Theme';
// import nodeContentRenderer from './Tree/Theme/node-content-renderer';

import imgGrid from 'images/constructor/grid.png';

interface IConstructorProps {
    pageTree: any;
    treeData: any;
    page?: any;
    pageTemplate: string;
    changePage?: any;
    setTagCanDropPosition?: any;
    selectTag?: any;
    addTag?: any;
    moveTag?: any;
    moveTreeTag?: any;
    copyTag?: any;
    removeTag?: any;
    selectedTag?: any;
    grid: boolean;
    toggleGrid: any;
    undo?: any;
    redo?: any;
    canUndo: boolean;
    canRedo: boolean;

    navigatePage?: (params: { name: string, params?: any }) => void;
    menus?: { id: string, name: string, conditions: string, value: string }[];
    onSave?: (block: string, error?: { type: string, error: string }) => void;
}

interface IConstructorState {
    treeData: any;
}

const ConstructorDiv = styled.div`
    min-height: 300px;
    position: relative;
    height: 100%;

    .left-panel {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 286px;
        min-height: 100px;
    }
    
    .right-panel {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 286px;
        min-height: 100px;
    }
    
    .center-panel {
        margin: 0 286px 0 286px;
        min-height: 400px;
    }
    
    .b-constructor-layout {
        margin: 0 20px;
        min-height: 600px;
        border-left: 1px solid #b1b1b1;
        border-right: 1px solid #b1b1b1;
        background-repeat: repeat;
        
    }
    
    .b-constructor-layout_grid {
        background-image: url(${imgGrid});
    }
    
    .b-constructor-layout_can-drop {
        background-color: rgba(150, 190, 255, 0.3);
    }

`;

class Constructor extends React.Component<IConstructorProps, IConstructorState> {
    constructor(props: IConstructorProps) {
        super(props);
        this.state = {
            treeData: props.treeData
        };
    }
    componentWillReceiveProps(props: IConstructorProps) {
        if (this.state.treeData !== props.treeData) {
            this.setState({
                treeData: props.treeData
            });
        }
    }
    render() {
        return (
            <ConstructorDiv>
                <div className="left-panel">
                    <Panel title="Objects">
                        <SourceElements/>
                    </Panel>

                    <div style={{ height: 500 }}>
                        <Tree
                            treeData={this.state.treeData}
                            onChange={(treeData: any) => { this.setState({treeData}); }}
                            onMoveNode={(args) => {
                                this.props.moveTreeTag({
                                    treeData: this.state.treeData,
                                    tagID: args.node.id
                                });
                                // alert(JSON.stringify(args.node));
                                // alert(JSON.stringify(this.state.treeData));
                                // alert(args['prevPath']);
                                // alert(args['nextPath']);
                                // alert(JSON.stringify(args['nextTreeIndex']));
                                // this.props.moveTag({
                                //    tag: args.node.tag,
                                //    destinationTagID: props.tag.id,
                                //    position: getDropPosition(monitor, component, props.tag)
                                // });
                            }}
                            scaffoldBlockPxWidth={10}
                            canDrag={(node: any) => { return true; }}
                            innerStyle={{padding: '15px 0', backgroundColor: '#465669', color: '#FFFFFF' }}
                            theme={TreeTheme}
                            generateNodeProps={({ node, path }) => ({
                                title:  (
                                    <span
                                        onClick={
                                            () => {
                                                this.props.selectTag({ tag: node.tag });
                                            }
                                        }
                                    >
                                        {node.title}
                                    </span>
                                ),
                                buttons: [
                                    <button
                                        key={node.tag.id}
                                        className="tree-button-remove"
                                        onClick={
                                            () => {
                                                this.props.removeTag({ tag: node.tag });
                                            }
                                        }
                                    >
                                        &times;
                                    </button>
                                ]
                            })}
                        />
                    </div>

                    {/*<Panel title="Structure">
                     <ul className="b-tree">
                     <li>
                     <i className="fa fa-caret-down" />
                     HTML
                     </li>
                     <li>
                     <span className="b-tree-indent" />
                     <i className="fa fa-caret-right" />
                     Header
                     </li>
                     <li>
                     <span className="b-tree-indent" />
                     <i className="fa fa-caret-down" />
                     Body
                     </li>
                     <li>
                     <span className="b-tree-indent" />
                     <span className="b-tree-indent" />
                     <i className="fa fa-caret-down" />
                     Header
                     </li>
                     <li className="selected">
                     <i className="fa fa-close b-tree-delete" />
                     <span className="b-tree-indent" />
                     <span className="b-tree-indent" />
                     <span className="b-tree-indent" />
                     <i className="fa fa-caret-down" />
                     Paragraph
                     </li>
                     <li>
                     <span className="b-tree-indent" />
                     <span className="b-tree-indent" />
                     <span className="b-tree-indent" />
                     <i />
                     Strong
                     </li>
                     </ul>
                     </Panel>
                     */}
                </div>
                <div className="center-panel">
                    <div className="b-instrument-panel b-panel-light">
                        <div className="b-instrument-panel__inner pull-left">
                            <button
                                className={this.props.canUndo ? 'btn-container btn-container_active' : 'btn-container btn-container_disabled'}
                                onClick={this.props.undo}
                            >
                                <i className="site-icon-undo site-icon_big"/>
                            </button>
                            <button
                                className={this.props.canRedo ? 'btn-container btn-container_active' : 'btn-container btn-container_disabled'}
                                onClick={this.props.redo}
                            >
                                <i className="site-icon-redo site-icon_big"/>
                            </button>
                        </div>
                        <div className="b-instrument-panel__inner pull-right">
                            {/*
                             <div className="b-icon-group pull-left">
                             <div className="b-icon pull-left">
                             <img src={imgViewMobile} />
                             </div>
                             <div className="b-icon pull-left">
                             <img src={imgViewTablet} />
                             </div>
                             <div className="b-icon pull-left">
                             <img src={imgViewLaptop} />
                             </div>
                             <div className="b-icon pull-left">
                             <img src={imgViewDesktop} />
                             </div>
                             </div>
                             */}
                            <div className="b-icon-group pull-left">
                                <div className="b-switch">
                                    <span>GRID</span>
                                    <Switch
                                        initialValue={this.props.grid ? 'grid' : ''}
                                        onValue="grid"
                                        offValue=""
                                        onChange={this.props.toggleGrid}
                                    />
                                </div>
                                {/*
                                 <div className="b-switch">
                                 <span>SNAP</span>
                                 <Switch initialValue="snap" onValue="snap" offValue="" />
                                 </div>
                                 */
                                }
                            </div>

                        </div>
                    </div>

                    <Layout grid={this.props.grid} addTag={this.props.addTag} moveTag={this.props.moveTag} copyTag={this.props.copyTag}>
                        <Protypo
                            context="page"
                            payload={this.props.pageTree}
                            editable={true}
                            changePage={this.props.changePage}
                            setTagCanDropPosition={this.props.setTagCanDropPosition}
                            selectTag={this.props.selectTag}
                            addTag={this.props.addTag}
                            moveTag={this.props.moveTag}
                            copyTag={this.props.copyTag}
                            removeTag={this.props.removeTag}
                            selectedTag={this.props.selectedTag}
                        />
                    </Layout>

                </div>
                <div className="right-panel">
                    <Properties
                        tag={this.props.selectedTag}
                        changePage={this.props.changePage}
                    />
                    <EditPage
                        page={this.props.page}
                        pageTemplate={this.props.pageTemplate}
                        menus={this.props.menus}
                        tabView={true}
                        saveButton={true}
                        navigatePage={this.props.navigatePage}
                        onExec={this.props.onSave}
                    />
                </div>
            </ConstructorDiv>
        );
    }
}

export default Constructor;