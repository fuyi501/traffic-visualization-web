'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */

    async indexAction() {
        this.assign("title", "首页") //给title赋值为 Hello

        return this.display();
    }

    async buslinesAction() {
        this.assign("title", "出租车轨迹") //给title赋值为 Hello

        return this.display();
    }
   
    async jobheatAction() {
        this.assign("title", "工作热力分析") //给title赋值为 Hello

        let data = await this.model('tmp_o_mc_10').where({time:{'>':'2016-09-01 00:10:00','<':'2016-09-01 00:30:00'}}).limit(50000).select();
        // console.log(data)

        let livedata = [];
        let senddata = [];

        for(var i=0;i<data.length;i++)
        {
          livedata.push({
            coord:[data[i]['loc']['coordinates'][0],data[i]['loc']['coordinates'][1]]
          });

        }
        senddata.push(livedata);
        // console.log(senddata);
        return this.json(senddata);
    }
   
    async hotstopAction() {
        this.assign("title", "热门出行站点") //给title赋值为 Hello

        let data = await this.model('bdpoi').select();

        let stopdata = [];

        for(var i=0;i<data.length;i++)
        {
          // console.log("bdpoi:",data[i]['loc']['coordinates']);
          stopdata.push({
            stopName:data[i]['NAME'],
            jingdu:data[i]['loc']['coordinates'][0],
            weidu:data[i]['loc']['coordinates'][1]
          });

        }
        return this.json(stopdata);
    }

    async guiji1Action() {
        this.assign("title", "出租车轨迹") //给title赋值为 Hello

        let data = await this.model('beijingTaxiTra').where({name_id:'196'}).select();

        let guiji1data = [];

        

        for(var i=0;i<data.length;i++)
        {
            // console.log(data[i]['coords'])
            // console.log("bdpoi:",data[i]['loc']['coordinates']);
            guiji1data.push({
                NameId:data[i]['name_id'],
                coords:data[i]['trajectory'][0]['trajectory']
            });

        }
        console.log(guiji1data)
        return this.json(guiji1data);
    }

    async guiji2Action() {
        this.assign("title", "首页") //给title赋值为 Hello

        let data = await this.model('beijingTaxiTra').limit(60).select();

        let guiji2data = [];

        for(var i=0;i<data.length;i++)
        {
            if(data[i]['trajectory'].length != 0)
            {
                guiji2data.push({
                    NameId:data[i]['name_id'],
                    coords:data[i]['trajectory'][0]['trajectory']
                });
            }
            else  console.log(data[i]['name_id'],'为空') ;

        }
        return this.json(guiji2data);
    }

    async stoppointAction() {
        this.assign("title", "停留点") //给title赋值为 Hello

        let data = await this.model('stoppoint').limit(200).select();

        let spointdata = [];

        for(var i=0;i<data.length;i++)
        {
            if(data[i]['zhixin'].length != 0)
            {
                for(var j=0;j<data[i]['zhixin'].length;j++){
                    spointdata.push({
                        name:data[i]['name_id']+'_'+data[i]['zhixin'][j]['cu_id'],
                        value:[data[i]['zhixin'][j]['cu_zhixin'][0][1].toFixed(6),data[i]['zhixin'][j]['cu_zhixin'][0][0].toFixed(6),data[i]['zhixin'][j]['cu_count']]
                    });
                }
                
            }
            else  console.log(data[i]['name_id'],'为空') ;

        }
        // console.log(spointdata)
        return this.json(spointdata);
    }

    async newhotpointAction() {
        this.assign("title", "热门出行站点") //给title赋值为 Hello

        let data = await this.model('stoppoint').where({name_id:{'>':200}}).limit(200).select();

        let spointdata = [];
        let tem = 0;
        for(var i=0;i<data.length;i++)
        {
            if(data[i]['zhixin'].length != 0)
            {
                for(var j=0;j<data[i]['zhixin'].length;j++){

                    tem = data[i]['zhixin'][j]['cu_count'];
                    if(tem>1400){
                        break;
                    }else{
                        spointdata.push({
                            name:data[i]['name_id']+'_'+data[i]['zhixin'][j]['cu_id'],
                            value:[data[i]['zhixin'][j]['cu_zhixin'][0][1].toFixed(6),data[i]['zhixin'][j]['cu_zhixin'][0][0].toFixed(6),data[i]['zhixin'][j]['cu_count']]
                        });
                    }
               
                }
                
            }
            else  console.log(data[i]['name_id'],'为空') ;

        }
        // console.log(spointdata)
        return this.json(spointdata);
    }

    async newroadhotAction() {
        this.assign("title", "道路热力分析") 

        let hotdata = await this.model('zhengzhouTaxi').limit(5000).select();
        // console.log(hotdata)
        let data = [];

        for(var x=0;x<hotdata.length;x++){
            // console.log(hotdata[x].length)
            data.push(hotdata[x]['loc']['coordinates'])
            // console.log(hotdata[x]['loc']['coordinates'])
        }
        // console.log(data)
       
        return this.json(data);
    }

    danguijiAction() {
        //auto render template file index_index.html
        this.assign("title", "单点轨迹")
        return this.display();
    }
    duoguijiAction() {
        //auto render template file index_index.html
        this.assign("title", "多点轨迹")
        return this.display();
    }
    yasuoguijiAction() {
        //auto render template file index_index.html
        this.assign("title", "压缩轨迹") 
        return this.display();
    }
    spointAction() {
        //auto render template file index_index.html
        this.assign("title", "停留点识别") 
        return this.display();
    }
    newhotsiteAction() {
        //auto render template file index_index.html
        this.assign("title", "热门出行站点") 
        return this.display();
    }
    hotfenxiAction() {
        //auto render template file index_index.html
        this.assign("title", "区域热力分析") 
        return this.display();
    }
    newroadheatAction() {
        //auto render template file index_index.html
        this.assign("title", "道路热力分析") 
        return this.display();
    }


}
