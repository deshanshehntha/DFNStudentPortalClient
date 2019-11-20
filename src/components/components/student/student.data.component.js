import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {MDBBtn, MDBView, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBIcon} from "mdbreact";
import {connect} from 'react-redux'
import {getAllStudentData} from '../../../actions/student.data.actions'
import {bindActionCreators} from 'redux'


class StudentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Name", field: "name", sortable: true, filter: true,
                cellStyle: this.getRowStyle, fontWeight: "bold"
            }, {
                headerName: "Email", field: "email", sortable: true, filter: true,
                cellStyle: this.getRowStyle, width: 250
            }, {
                headerName: "University", field: "university", sortable: true, filter: true,
                cellStyle: this.getRowStyle,
            },
                {
                    headerName: "Batch", field: "batch", sortable: true, filter: true,
                    cellStyle: this.getRowStyle, width: 100
                }
                , {
                    headerName: "Github", field: "github", sortable: true, filter: true,
                    cellStyle: this.getRowStyle,
                    cellRenderer: (params) => {
                        var link = document.createElement('a');
                        link.innerText = params.value;
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            console.log(params.data);
                        });
                        return '<a href="https://github.com/' + params.value + '" target="_blank">' + params.value + '</a>'
                    }
                }, {
                    headerName: "LinkedIn", field: "linkedin", sortable: true, filter: true,
                    cellStyle: this.getRowStyle,
                    cellRenderer: (params) => {
                        var link = document.createElement('a');
                        link.innerText = params.value;
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            console.log(params.data);
                        });
                        return '<a href="https://www.linkedin.com/in/' + params.value + '" target="_blank">' + params.value + '</a>'
                    }
                }, {
                    headerName: "Contact No", field: "contactNo", sortable: true, filter: true,
                    cellStyle: this.getRowStyle, width: 160

                }, {
                    headerName: "Technologies", field: "technologies", sortable: true, filter: true, resizable: true,
                    cellStyle: this.getRowStyle,
                }, {
                    headerName: "Extra C.", field: "extra", sortable: true, filter: true,
                    cellStyle: this.getRowStyle,

                }


            ],
            rowData: []
        }
    }

    getRowStyle(params) {
        // let color;
        // if (parseInt(params.node.childIndex) % 2 === 0) {
        //     color = '#E3F2FD';
        // } else {
        //     color = '#ffffff';
        // }'background-color': color,
        if (isNaN(params.value)) {
            return {textAlign: "left"}
        } else {
            return {textAlign: "right"}

        }

    };

    onGridReady = params => {
        this.gridApi = params.api;
    }

    onBtExport() {

        var params = {
            fileName: "Student Details",
            allColumns: "true",
            processCellCallback: formatGitHubUrl,
        };

        function formatGitHubUrl(params) {
            console.log(params)
            if (params.column.colDef.headerName === 'Github' && params.node.data.github != null && params.node.data.github !== "N/A") {
                return 'https://www.github.com/' + params.node.data.github;
            } else if (params.column.colDef.headerName === 'LinkedIn' && params.node.data.linkedin != null && params.node.data.linkedin !== "N/A") {
                return 'https://www.linkedin.com/in/' + params.node.data.linkedin;
            } else if (params.column.colDef.headerName === 'Contact No' && params.node.data.contactNo != null && params.node.data.contactNo !== "N/A") {
                return "0"+params.node.data.contactNo+"";
            } else {
                return params.value;

            }
        }

        this
            .gridApi
            .exportDataAsCsv(params);
    }

    componentDidMount() {
        this.props.getAllStudents();
    }

    render() {

        return (
            <div className="text-center">
                <MDBRow md="12">
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <label style={{marginLeft: "20px"}}>
                                    <button onClick={this.onBtExport.bind(this)}>Export to CSV</button>
                                </label>
                                <div
                                    className="ag-theme-balham"
                                    style={{
                                        height: '500px',
                                        width: '100%'
                                    }}
                                >
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs}
                                        rowData={this.props.rowData}
                                        onGridReady={this.onGridReady}
                                    >
                                    </AgGridReact>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>

        )

    }
}

function mapStateToProps(state) {
    return {
        rowData: state.student.users,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllStudents: bindActionCreators(getAllStudentData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);
