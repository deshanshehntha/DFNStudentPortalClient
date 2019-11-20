import CanvasJSReact from '../../../canvasjs.react';
import {MDBCard, MDBCardText, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {bindActionCreators} from 'redux'
import {getAllStudentData} from "../../../actions/student.data.actions";
import {connect} from "react-redux";
import * as CanvasJS from "../../../canvasjs.min";
import '../../../App.css'
import {AgGridReact} from "ag-grid-react";

var React = require('react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var Component = React.Component;
var java = 0;

class ChartHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            javaStudents: [],
            result: [],
            languageForCharts: [],
            dataPoints: [],
            dataPointsForPieCharts: [],
            columnDataPoints: [],
            universities: [],
            columnDefs: [{
                headerName: "Technology", field: "label", sortable: true, filter: true, width: 170,
                cellStyle: this.getRowStyle, fontWeight: "bold"
            }, {
                headerName: "No of Students", field: "y", sortable: true, filter: true, width: 170,
                cellStyle: this.getRowStyle,
                sort: "desc",
            }, {
                headerName: "Percentage (%)", field: "z", sortable: true, filter: true, width: 170,
                cellStyle: this.getRowStyle,
                sort: "desc",
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


    componentDidMount() {
        this.props.getAllStudents();
    }

    componentWillUpdate(nextState) {

        var tList = [];
        var uniList = nextState.universities;

        let columnDataPoints = [];
        for (let k = 0; k < uniList.length; k++) {
            let stdCount = 0;
            for (let m = 0; m < nextState.students.length; m++) {
                if (uniList[k] === nextState.students[m].university) {
                    stdCount++
                }
            }
            let obj = {
                label: uniList[k],
                y: stdCount
            }
            columnDataPoints.push(obj)
        }

        var language;
        language = nextState.students.map(function ({technologies}) {
            var result = [];
            result = technologies.split(",");
            return {result};
        });

        let languagesForChart = [];

        for (let i = 0; i < language.length; i++) {
            var temp = [];
            temp = language[i];
            for (let j = 0; j < temp.result.length; j++) {
                if (!languagesForChart.includes(temp.result[j].trim()) && temp.result[j] !== "" && temp.result[j] !== null) {
                    languagesForChart.push(temp.result[j].trim());
                }
            }
        }

        let counts = [];
        var dataPoints = [];
        var dataPointsWithOthers = [];
        var othersCount = 0;

        for (let i = 0; i < languagesForChart.length; i++) {
            counts = nextState.students.filter(function (item) {
                return item.technologies.toLowerCase().includes(languagesForChart[i].toLowerCase())
            }).map(function ({name, email}) {
                return {name, email};
            });
            let obj = {
                y: counts.length,
                label: languagesForChart[i],
                z: ''
            };
            dataPoints[i] = obj;
        }

        let allValidDatapoints = 0;
        for (let i = 0; i < dataPoints.length; i++) {
            allValidDatapoints = allValidDatapoints + dataPoints[i].y
        }
        for (let i = 0; i < dataPoints.length; i++) {
            dataPoints[i].z = parseFloat((dataPoints[i].y / allValidDatapoints) * 100).toFixed(2)
        }

        let dataPointsForPieChart =  dataPoints.sort(function(a, b) {
            return b.y - a.y;
        }).slice(0,10);

        let top10Count = 0 ;
        dataPointsForPieChart.map(function ({y}) {
            top10Count = top10Count + y;
        });
        let OthersObj = {
            y: allValidDatapoints - top10Count,
            label: "Others",
            z: ''
        };
        dataPointsForPieChart.push(OthersObj);



        this.state.dataPointsForPieCharts = dataPointsForPieChart;
        this.state.dataPoints = dataPoints;
        this.state.columnDataPoints = columnDataPoints;

    }

    onGridReady = params => {
        this.gridApi = params.api;
        // params.api.sizeColumnsToFit()
    }


    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "dark1", "dark2"
            title: {
                text: "Technologies"
            },
            data: [{
                type: "pie",
                indexLabel: "{label} #percent%",
                startAngle: -90,
                dataPoints: this.state.dataPointsForPieCharts
            }],
        };
        const options1 = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", //"light1", "dark1", "dark2"
            title: {
                text: "Student Details By University"
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: this.state.columnDataPoints
            }]
        };

        return (
            <MDBContainer>
                <div>
                    <MDBRow md="12">
                        <MDBCol md="6">
                            <MDBCard>
                                <CanvasJSChart options={options}
                                    /* onRef={ref => this.chart = ref} */
                                />
                                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBCard>
                                <div
                                    className="ag-theme-balham"
                                    style={{
                                        height: '400px',
                                        width: '100%'
                                    }}
                                >
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs}
                                        rowData={this.state.dataPoints}
                                        onGridReady={this.onGridReady}
                                        sortingOrder={this.state.sortingOrder}
                                        suppressHorizontalScroll={true}


                                    >
                                    </AgGridReact>
                                </div>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </div>

                <div className="mt-5">
                    <MDBRow md="12">
                        <MDBCol md="12">
                            <MDBCard>
                                <CanvasJSChart options={options1}
                                    /* onRef={ref => this.chart = ref} */
                                />
                                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </div>
            </MDBContainer>


        );

    }
}

function

mapStateToProps(state) {
    return {
        students: state.student.users,
        universities: state.student.universities
    }
}

function

mapDispatchToProps(dispatch) {
    return {
        getAllStudents: bindActionCreators(getAllStudentData, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)

(
    ChartHome
)
;

