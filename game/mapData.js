var gColorSymbolMap = {0:'<font style="background-color:green;">&nbsp;</font>',7:'<font style="background-color:yellow;">&nbsp;</font>',91:'<font style="background-color:darkgreen;">&nbsp;</font>',164:'<font style="background-color:brown;">&nbsp;</font>'};

var gBlockMap = {'0,0':[0,-1,4,-1,1,-1,-1,-1,5],'1,0':[1,-1,5,0,2,-1,-1,4,6],'2,0':[2,-1,6,1,3,-1,-1,5,7],'3,0':[3,-1,7,2,-1,-1,-1,6,-1],'0,1':[4,0,-1,-1,5,-1,1,-1,-1],'1,1':[5,1,-1,4,6,0,2,-1,-1],'2,1':[6,2,-1,5,7,1,3,-1,-1],'3,1':[7,3,-1,6,-1,2,-1,-1,-1]};

var gMapData = {0:{'blockXY':[0, 0],'data':[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 91, 91, 91, 91, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 91, 91, 91, 91, 91, 91, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 91, 91, 91, 91, 91, 91, 91, 91, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 255, 255, 255, 255, 255]]},1:{'blockXY':[1, 0],'data':[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]},2:{'blockXY':[2, 0],'data':[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]},3:{'blockXY':[3, 0],'data':[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]},4:{'blockXY':[0, 1],'data':[[255, 255, 255, 255, 255, 255, 91, 91, 91, 91, 91, 91, 91, 91, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 91, 91, 91, 91, 91, 91, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 91, 91, 91, 91, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 164, 164, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 164, 164, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 164, 164, 255, 255, 255, 255, 255, 255, 255, 255, 0], [255, 255, 255, 255, 255, 255, 255, 255, 255, 164, 164, 255, 255, 255, 255, 255, 0, 0, 0, 0], [255, 255, 255, 255, 255, 255, 255, 255, 255, 164, 164, 255, 255, 0, 0, 0, 0, 0, 0, 0], [255, 255, 255, 255, 255, 255, 255, 255, 255, 164, 164, 0, 0, 0, 0, 0, 0, 0, 0, 0], [255, 255, 255, 255, 255, 255, 255, 0, 0, 164, 164, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 164, 164, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 164, 164, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]},5:{'blockXY':[1, 1],'data':[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]},6:{'blockXY':[2, 1],'data':[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]},7:{'blockXY':[3, 1],'data':[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 255, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 255, 255, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [255, 255, 255, 255, 255, 255, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [7, 7, 7, 7, 7, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [7, 7, 7, 7, 7, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [7, 7, 7, 7, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [7, 7, 7, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]}};