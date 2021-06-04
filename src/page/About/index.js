import React from 'react';
import { connect } from 'react-redux'
import * as homeActions from '../../redux/actions/home'
import { bindActionCreators } from 'redux'
import qs from 'querystring'
import html2canvas from 'html2canvas/dist/html2canvas.min.js'
import Canvas2Image from "./canvas2image.js";
import Jsbridge from "xesjsbridge/dist";
import AppApi from '../../api/AppApi.js'
import * as Api from '../../api/api.js'
import { Cookies } from "../../type/index.d.ts"
import { browser } from '../../utils/index.js'
import { Toast } from 'antd-mobile'
import 'antd-mobile/lib/toast/style/css'
import './index.styl'
import Bind from '../../compontents/Bind'


// function photoCompress(file, w, objDiv, indexs) {
//     var ready = new FileReader();
//     /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
//     ready.readAsDataURL(file);
//     ready.onload = function () {
//         var re = this.result;
//         canvasDataURL(re, w, objDiv, indexs)
//     }
// }

// function canvasDataURL(path, obj, callback, indexs) {
//     var img = new Image();
//     img.src = path;
//     img.onload = function () {
//         var that = img;
//         // 默认按比例压缩
//         var w = that.width,
//             h = that.height,
//             scale = w / h;
//         w = obj.width || w;
//         h = obj.height || (w / scale);
//         w = .2 * w
//         h = .2 * h
//         var quality = 0.5;  // 默认图片质量为0.7
//         //生成canvas
//         var canvas = document.createElement('canvas');
//         var ctx = canvas.getContext('2d');
//         // 创建属性节点
//         var anw = document.createAttribute("width");
//         anw.nodeValue = w + '';
//         var anh = document.createAttribute("height");
//         anh.nodeValue = h + '';
//         canvas.setAttributeNode(anw);
//         canvas.setAttributeNode(anh);
//         ctx.drawImage(that, 0, 0, w, h);
//         // 图像质量
//         // if(obj.quality && obj.quality <= 1 && obj.quality > 0){
//         //     quality = obj.quality;
//         // }
//         // quality值越小，所绘制出的图像越模糊
//         var base64 = canvas.toDataURL('image/jpeg', quality);
//         // 回调函数返回base64的值
//         callback(base64, indexs);
//     }
// }

/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 * 用url方式表示的base64图片数据
 */
// function convertBase64UrlToBlob(urlData) {
//     var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], { type: mime });
// }
class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            BindOff: false
        }
    }

    async componentDidMount() {
        if (browser.versions._weixin) {
            console.log('是微信呀')
        } else if (browser.versions.isxesApp) {
            AppApi.setTitle('h5_demo')
            AppApi.cancelLogin()
            AppApi.setShareContent('邀好友,领好礼', 'https://imgs.xrspy.com/old_new/share.jpg', '送好友9元学10课时名师直播课，15件礼物等你免费拿！', window.location.href)
            AppApi.navToFeShare(this.testFn)
            AppApi.guestLogin(this.appGetData)
            let res = await AppApi.getGuestMode()
            if (!res) return Toast.fail('AppApi报错,请稍后重试')
            if (res.state == 0) {
                await AppApi.openLoginVCOnGuestMode()
            } else {
                this.appGetData()
            }
        } else {
            console.log('哈哈哈，我是除微信和学而思APP之外的环境~')
        }
    }

    componentWillUnmount() { }

    testFn = () => {
        console.log('分享成功')
    }

    appGetData = async () => {
        let data = await AppApi.getUserInfo()
        console.log(data, '--data--')
        console.log(this.props.home.userdata, '--this.props.home.userdata--')
    }

    // // 生成组队邀请海报
    // handlePost = () => {
    //     Toast.loading('正在生成海报...', 30);
    //     Promise.all([this.createPoster(this.imgRef)]).then((result) => {
    //         this.setState({
    //             resPostUrl: result[0]
    //         }, () => {
    //             setTimeout(() => {
    //                 Toast.hide()
    //                 this.setState({
    //                     PosterOff: true
    //                 })
    //             }, 200)
    //         })
    //     }).catch((error) => {
    //         console.log(error, '=error==')
    //         Toast.fail(error)
    //     })
    // }

    // //绘制海报方法
    // createPoster = (post) => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             window.scrollTo(0, 0)
    //             let shareContent = post;
    //             // console.log(shareContent.getBoundingClientRect(), '--getBoundingClientRect()--')
    //             // let width = shareContent.getBoundingClientRect().width;
    //             // let height = shareContent.getBoundingClientRect().height;
    //             let width = shareContent.offsetWidth;
    //             let height = shareContent.offsetHeight;
    //             let canvas = document.createElement("canvas");
    //             let scale = 1.5;
    //             canvas.width = width * scale;
    //             canvas.height = height * scale;
    //             canvas.getContext("2d").scale(scale, scale);
    //             window.html2canvas || html2canvas(shareContent, {
    //                 useCORS: true,
    //                 // allowTaint: true,
    //                 // proxy: 'https://father.xrspy.com/jiazhanghuifile',
    //                 width: width - 2,
    //                 height: height - 2,
    //             }).then((canvas) => {
    //                 let context = canvas.getContext("2d");
    //                 // 【重要】关闭抗锯齿
    //                 context.imageSmoothingEnabled = false;
    //                 var img = Canvas2Image.convertToImage(
    //                     canvas,
    //                     canvas.width,
    //                     canvas.height
    //                 );
    //                 resolve(img.src)
    //             }).catch(() => {
    //                 reject('海报生成失败~')
    //             })
    //         }, 500)
    //     })
    // }

    // 上传图片或视频到七牛云并返回七牛云的线上链接
    // uploadImgToQiniu = (imgData, index, uploadType) => {
    //     let file = imgData;
    //     let next = (response) => { };
    //     let complete = (response) => {
    //         let { bigUrl, smallUrl } = this.state
    //         if (uploadType === 'big') {
    //             bigUrl[index] = 'http://xueersiimg.xrspy.com/' + response.key
    //             this.setState({
    //                 bigUrl
    //             }, () => {
    //                 if ((this.state.bigUrl.filter(item => item.startsWith('http')).length == this.state.files.length) && (this.state.smallUrl.filter(item => item.startsWith('http')).length == this.state.files.length)) {
    //                     let reqParams = {
    //                         urlList: [{ smallUrl: this.state.smallUrl }, { bigUrl: this.state.bigUrl }],
    //                         desc: this.state.desc,
    //                         backImg: '',
    //                         activeId: this.state.activeId
    //                     }
    //                     this.handleUploadWorks(reqParams)
    //                 }
    //             })
    //         }
    //         if (uploadType === 'small') {
    //             smallUrl[index] = 'http://xueersiimg.xrspy.com/' + response.key
    //             this.setState({
    //                 smallUrl
    //             }, () => {
    //                 if ((this.state.bigUrl.filter(item => item.startsWith('http')).length == this.state.files.length) && (this.state.smallUrl.filter(item => item.startsWith('http')).length == this.state.files.length)) {
    //                     let reqParams = {
    //                         urlList: [{ smallUrl: this.state.smallUrl }, { bigUrl: this.state.bigUrl }],
    //                         desc: this.state.desc,
    //                         backImg: '',
    //                         activeId: this.state.activeId
    //                     }
    //                     this.handleUploadWorks(reqParams)
    //                 }
    //             })
    //         }
    //         if (uploadType === 'video') {
    //             smallUrl[0] = 'http://xueersiimg.xrspy.com/' + response.key;
    //             bigUrl[0] = 'http://xueersiimg.xrspy.com/' + response.key;
    //             this.setState({
    //                 smallUrl,
    //                 bigUrl,
    //                 videosObj: {
    //                     ...this.state.videosObj,
    //                     url: 'http://xueersiimg.xrspy.com/' + response.key,
    //                 },
    //             }, () => {
    //                 if (this.state.videosObj.url.startsWith('http') && this.state.videosObj.postUrl.startsWith('http')) {
    //                     let reqParams = {
    //                         urlList: [{ smallUrl: this.state.smallUrl }, { bigUrl: this.state.bigUrl }],
    //                         desc: this.state.desc,
    //                         backImg: this.state.videosObj.postUrl,
    //                         activeId: this.state.activeId
    //                     }
    //                     this.handleUploadWorks(reqParams)
    //                 }
    //             })
    //         }
    //         if (uploadType === 'backImg') {
    //             this.setState({
    //                 videosObj: {
    //                     ...this.state.videosObj,
    //                     postUrl: 'http://xueersiimg.xrspy.com/' + response.key,
    //                 },
    //             }, () => {
    //                 if (this.state.videosObj.url.startsWith('http') && this.state.videosObj.postUrl.startsWith('http')) {
    //                     let reqParams = {
    //                         urlList: [{ smallUrl: [this.state.videosObj.url] }, { bigUrl: [this.state.videosObj.url] }],
    //                         desc: this.state.desc,
    //                         backImg: this.state.videosObj.postUrl,
    //                         activeId: this.state.activeId
    //                     }
    //                     this.handleUploadWorks(reqParams)
    //                 }
    //             })
    //         }
    //     };
    //     let error = (response) => {
    //         console.log(response, '--图片上传错误信息--')
    //         Toast.fail('上传错误')
    //     };
    //     let name = (
    //         new Date().getTime() +
    //         "" +
    //         Math.floor(Math.random() * 1000)
    //     ).substring(2);
    //     let key = "VOTE_TOOL/" + name;
    //     let putExtra = {
    //         fname: "dec",
    //         params: {
    //             data: new Date().getTime()
    //         },
    //     }
    //     let config = {
    //         useCdnDomain: true,
    //         region: qiniu.region.z0
    //     }
    //     let observable = qiniu.upload(
    //         file,
    //         key,
    //         this.state.token,
    //         putExtra,
    //         config
    //     );
    //     observable.subscribe(next, error, complete);
    // }

    render() {
        const { BindOff } = this.state
        const { } = this
        return (
            <div id="About">
                <Bind
                    AlertShow={BindOff}
                    close={() => this.setState({ BindOff: false })}
                />
				H5_DEMO  666
                <div onClick={() => {
                    this.setState({ BindOff: true })
                }}>click Me</div>
            </div>
        );
    }
}

const mapState = (state) => ({
    home: state.home
});
const mapDispatchToProps = (dispatch) => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}
export default connect(mapState, mapDispatchToProps)(About);