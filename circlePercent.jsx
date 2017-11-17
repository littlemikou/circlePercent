import {Component,createElement,isValidElement} from 'rax';
import { View, Text } from 'nuke'
const css = {
    wrap: {
        position: 'relative',
        top: '50rem',
        left: '100rem'
    },
    centerCircle: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        fontSize:'30rem'
    },
    leftWrap: {
        position: 'absolute',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        top: 0,
        left: 0
    },
    rightWrap: {
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    }
}
export default class CirclePercent extends Component {
    constructor(props) {
        super(props);
    }

    circlePro(param){
        let {percent, barColor, backColor, barWidth, circleWidth} = param;
        //处理进度条颜色、百分比
        let rotate, bColorBar, bColorBack, halfLeft, halfRight;
            rotate = percent*3.6;
            bColorBar = {backgroundColor: barColor};
            bColorBack = {backgroundColor: backColor};
        if(rotate <= 180){
            halfLeft = {transform:'0deg'};
            halfRight = {transform: 'rotate('+ rotate +'deg)'};
        }else if(rotate > 180){
            halfLeft = {transform: 'rotate('+ rotate +'deg)'};
            halfRight = {transform: '0deg'};
            // 交换颜色
            bColorBar = {backgroundColor:backColor};
            bColorBack = {backgroundColor:barColor};
        }
        // 处理进度条宽度，圆的半径
        let wrapStyle = {
            width: circleWidth + 'rem',
            height: circleWidth + 'rem',
            borderRadius: circleWidth / 2 + 'rem',
        }
        let centerCircleStyle = {
            width: circleWidth - barWidth * 2 + 'rem',
            height: circleWidth - barWidth * 2 + 'rem',
            borderRadius: (circleWidth - barWidth) / 2 + 'rem',
            top: barWidth + 'rem',
            left: barWidth + 'rem',
        }
        let leftWrapStyle = {
            width: circleWidth / 2 + 'rem',
            height: circleWidth,
            borderRadius: circleWidth / 2 + 'rem',
            transformOrigin: circleWidth/2+' '+ circleWidth/2
        }
        let rightWrapStyle = {
            left: circleWidth / 2 + 'rem',
            width: circleWidth / 2 + 'rem',
            height: circleWidth + 'rem',
            borderRadius: circleWidth / 2 + 'rem',
            transformOrigin:'0 ' + circleWidth / 2
        }
        

        return <View style={[css.wrap, bColorBar,wrapStyle]}>
                    <View style={[css.leftWrap, halfLeft,bColorBack,leftWrapStyle]}></View>
                    <View style={[css.rightWrap,halfRight,bColorBack,rightWrapStyle]}></View>
                    <View style={[css.centerCircle,centerCircleStyle]}>{this.props.centerContent}</View>
                </View>
       
    }
    render() {
        let circleShape = this.props.circleShape;
        let params = {
            percent: circleShape.percent || 0,
            barColor: circleShape.barColor || 'red', //进度条颜色（背景底色）
            backColor: circleShape.backColor || '#eeeeee', // 两个半圆的颜色
            circleWidth: circleShape.circleWidth || 200,
            barWidth: circleShape.barWidth || 5
        }

        return (
            this.circlePro(params)
        );
    }
}

// 使用
// let circleShape = {
//     percent: 20,
//     barColor: 'green',
//     backColor: '#eeeeee',
//     barWidth: 5,
//     circleWidth: 500
// }

{/* <CirclePercent 
    circleShape = {circleShape}
    centerContent = {
        <Text>{circleShape.percent}%</Text>
    }
></CirclePercent> */}