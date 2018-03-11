//以下function 皆用javascript撰寫而成

//Q1. Write a function that takes a string as input and returns the string reversed. 
var reverseString = function(s) {
    var ReversedStr= s.split("").reverse().join(""); //拆解、反轉、合併
    return ReversedStr;
};


//Q2. Given a positive integer num, write a function which returns True if num is a perfect square else False. 
var isPerfectSquareSol1 = function(num) {
    var i=1;
            var msg=false;
            while(i*i<=num){ //實驗至完全平方數大於input為止
                if(num==i*i){
                    msg=true;
                    break;
                }
                i++;
            }
            return msg;
};
        

var isPerfectSquareSol2 = function(num) {//運用完全平方數的性質:會等於奇數相加之和來解
    var i=1;
    while (num > 0) {
        num -= i;
        i += 2;
    }
    if(num == 0)
    {
        return true;
    }
    else {
        return false
    }
};


//Q3. Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary). 
You may assume that the intervals were initially sorted according to their start times. 

var insert = function(intervals, newInterval) {
    var answer=[];
    alreadyInsert=0;
    for(var i = 0; i < intervals.length; i++){ //一個一個區間來看
        var tmp = intervals[i];
        if(tmp.end<newInterval.start || alreadyInsert){ //假如舊區間的結尾比新區間的開頭還小或已經insert完的話
            answer.push([tmp.start, tmp.end]); //直接insert進去
        }
        else if(newInterval.end < tmp.start && !alreadyInsert){ //假如新區間的結尾比舊區間的開頭還小且未insert的話
            answer.push([newInterval.start, newInterval.end]); //新舊皆insert
            answer.push([tmp.start, tmp.end]);
            alreadyInsert=1; // insertflag立起
        }
        else { //其他狀況代表那些區間有互相重疊 則開頭取小 結尾取大
            newInterval.start = Math.min(tmp.start, newInterval.start);
            newInterval.end = Math.max(tmp.end, newInterval.end);
        }
        
    }
    if(!alreadyInsert){ //預防最後一組沒insert進去
            answer.push([newInterval.start, newInterval.end]);
            
    }
    return answer;
};

//Q4. Given a 2D board and a word, find if the word exists in the grid. 
var exist = function(board, word) {
    
    if(word == "") { //word為空直接pass
        return true;
    }
    else if(board.length == 0){    //word不為空 board為空直接fail
        return false;
    }
    for(i = 0; i < board.length; i++){
        for(j = 0; j < board[0].length; j++){
            if(board[i][j] == word[0]){ //先找到可以當起點的位置
                if(SearchNext(0,i,j)){
                    return true;
                }
             }
        }
    }
    return false;
    function SearchNext(index,x,y){
        if(index == word.length) return true; //當查到最後時回傳true來確認答案為true
        if(!board[x]) return false;
        if(board[x][y] == word[index]){ //第一次進來雖然一定是True 後續會重複call自己所以這是必要的判斷式
            var tmp = board[x][y]; //先把爬過的路數值存下來
            board[x][y] = 'used';  //用used來取代
            if(SearchNext(index+1,x-1,y)){//上
                return true;
            }
            if(SearchNext(index+1,x+1,y)){//下
                return true;
            }
            if(SearchNext(index+1,x,y-1)){//左
                return true;
            }
            if(SearchNext(index+1,x,y+1)){//右
                return true;
            }
            board[x][y] = tmp; //若皆不對將數值恢復
        }
        return false;
    }

};

//Q5. Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -. 
var getSumSol1 = function(a, b) { //玩文字遊戲版本 ++跟--在系統裡算不同 operator 
    while(b>0){
        a++;
        b--;
        
    }
    while(b<0){
        a--;
        b++;
        
    }
    return a;
};

var getSumSol2 = function(a, b) { //用加法器的原理來撰寫
    if(b==0){return a};
    if(a==0){return b};  

    while(b!=0){
        var carry = a&b; //進位元

        a = a^b;  //XOR

        b = carry << 1;  //往左位移
    }
    return a;
};

