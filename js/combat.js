
//  -------------------------------------NEEDED GLOBAL VARIABLES-------------------------------------
var score = 0;
var pHealth = 10;
var pBlock = 0;
var patternSelected = 0;
var time = 1000;
var timeMod = 40;
let nextPattern = true;
let proceedIn = true;
let attackable = true;
let healable = true;
const shake = 50;

//  -------------------------------------START / RESTART-------------------------------------
$(".startScreen").click(function(){
    if (proceedIn == true){         //initialize all visuals and variables to default states
        score = 000;
        pHealth = 10;
        nextPattern = true;
        time = 1000;
        $(".background").fadeOut(75);
        $(".backgroundHeal").fadeOut(75);
        $(".backgroundAttack").fadeOut(75);
        $(".healthFlash").fadeOut(75);
        $(".eAtk").fadeOut(75);
        $("#scoreboard").text("Score: 000");
        $(".healthIndic").css("background-color", "rgb(207, 67, 67)");
        $(this).fadeOut(2000, function(){proceedIn = false;});
    }
});


//  -------------------------------------BUTTON CLICK FUNCTIONS-------------------------------------
//attack
$(".attack").mousedown(function(){
    //atk main effect
    if(attackable == true){
        attackable = false;
        score += 100;
        $("#scoreboard").text("Score: "+score);
        screenShake();
        $(".backgroundAttack").fadeIn(10);
        $(".backgroundAttack").fadeOut(500);
    
    
        //advances phase if time
        if(nextPattern == true){selectPhase();}
        //cooldown on attacks
        setTimeout(function(){attackable = true}, 500);
    }

    //button visual
    $(".atk").attr("src", "img/attackButton_selected.png");
});
$(".attack").mouseup(function(){$(".atk").attr("src", "img/attackButton.png");});


//heal
$(".heal").mousedown(function(){
    $(".backgroundHeal").fadeIn(10);    //heal visual
    $(".backgroundHeal").fadeOut(500);
    
    if(healable==true){
        //health caps at 10
        if (pHealth < 10) {
            healable = false;
            pHealth += 2;
            $(".healthFlash").css("background-color", "white");
            $(".healthFlash").fadeIn(10);    //flash health bar
            $(".healthFlash").fadeOut(500);
            checkHp();
        }
    
        //advances phase if time
        if(nextPattern == true){selectPhase();}
        //heal cooldown
        setTimeout(function(){healable = true}, 500);
    }

    //button visual
    $(".h").attr("src", "img/healButton_selected.png");
});
$(".heal").mouseup(function(){$(".h").attr("src", "img/healButton.png");});


//  -------------------------------------ENEMY ATTACK FUNTIONS-------------------------------------
$(".eAtk").mousedown(function(){
    score += 50;
    $("#scoreboard").text("Score: "+score);

    $(this).fadeOut(75);
    pBlock--;
});


//  -------------------------------------PATTERN SELECTOR-------------------------------------
function selectPhase(){
    console.log("Phase Triggered");
    $(".barIndic").fadeOut(75);
    $(".eAtk").fadeOut(75);

    //pattern selected
    patternSelected = Math.floor((Math.random()*(10))+1);   //rand num w max and min included: (rand*(max-min+1)+min)

    //pFunc called
    nextPattern=false;
    switch(patternSelected){
        case 1:
            pBlock = 2;
            patternHLine();
            break;

        case 2:
            pBlock = 3;
            patternTri();
            break;

        case 3:
            pBlock = 4;
            patternX();
            break;

        case 4:
            pBlock = 4;
            patternZ();
            break;

        case 5:
            pBlock = 4;
            patternSquare();
            break;

        case 6:
            pBlock = 5;
            patternFish();
            break;

        case 7:
            pBlock = 4;
            patternSemiC();
            break;
        
        case 8:
            pBlock = 5;
            patternSwoop();
            break;

        case 9:
            pBlock = 6;
            patternAllRounder();
            break;

        case 10:
            pBlock = 6
            patternMurder();
            break;
    }
}


//  -------------------------------------END OF PHASE FUNCTION-------------------------------------
function damaged(){
    pHealth = pHealth-pBlock;
    if (timeMod >0){
        time = time-timeMod;             //dif increases on phase complete
        timeMod--;
    }
    
    console.log("Damage Taken: "+pBlock);
    console.log("Health Remaining: "+pHealth);

    if (pBlock > 0){   //damage taken visual
        $(".background").fadeIn(10);
        $(".background").fadeOut(500);
        screenShake();
        $(".healthFlash").css("background-color", "black");
        $(".healthFlash").fadeIn(10);    //flash health bar
        $(".healthFlash").fadeOut(500);
        checkHp();
    }

    if (pHealth <= 0){      //gameOver screen
        $("#msg1").text("Your Score: "+score);
        $("#msg2").text("Click To Try Again");
        $(".startScreen").fadeIn(2000, function(){proceedIn = true;});

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //                                        PUT STORE DATA HERE. STORE THE VAR *score*
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    $(".barIndic").fadeIn(200);
}


//  -------------------------------------VISUAL EFFECT FUNCTIONS-------------------------------------
function checkHp(){ //healthbar visual
    if(pHealth == 11) {$(".healthIndic").css("background-color", "rgb(248, 107, 142)");}        //yes you can overheal by ONE >:3
    else if(pHealth == 10) {$(".healthIndic").css("background-color", "rgb(207, 67, 67)");}
    else if (pHealth > 7) {$(".healthIndic").css("background-color", "rgb(187, 135, 67)");}
    else if (pHealth > 4) {$(".healthIndic").css("background-color", "rgb(102, 98, 44)");}
    else {$(".healthIndic").css("background-color", "rgb(9, 19, 8)");}
}

function screenShake(){
    $(".mann").css("left", '-.1%');

    setTimeout(function(){
        $(".mann").css("left", '.1%');

        setTimeout(function(){
            $(".mann").css("left", '0%');
            $(".mann").css("top", '-.1%');

            setTimeout(function(){
                $(".mann").css("top", '0%');

            },shake);
        },shake);
    },shake);
}

//  -------------------------------------PATTERNS-------------------------------------
//case 1
function patternHLine(){
    $(".eAttack3 img").fadeIn(100);

    setTimeout(function(){
        $(".eAttack4 img").fadeIn(100);

        setTimeout(function(){
            console.log("PHASE COMPLETE");
            $(".eAtk").fadeOut(75);
            damaged();
            nextPattern=true;

        }, 2*time);
    }, time);
}
//case 2
function patternTri(){

    $(".eAttack6 img").fadeIn(100);

    setTimeout(function(){
        $(".eAttack3 img").fadeIn(100);

        setTimeout(function(){
            $(".eAttack2 img").fadeIn(100);
            
            setTimeout(function(){
                console.log("PHASE COMPLETE");
                $(".eAtk").fadeOut(75);
                damaged();
                nextPattern=true;
    
            }, 2*time);
        }, time);
    }, time);
}
//case 3
function patternX(){
    $(".eAttack1 img").fadeIn(100);
    
    setTimeout(function(){
        $(".eAttack6 img").fadeIn(100);
        
        setTimeout(function(){
            $(".eAttack5 img").fadeIn(100);
            
            setTimeout(function(){
                $(".eAttack2 img").fadeIn(100);
                
                setTimeout(function(){
                    console.log("PHASE COMPLETE");
                    $(".eAtk").fadeOut(75);
                    damaged();
                    nextPattern=true;
                        
                }, 2*time);
            }, time);
        }, time);
    }, time);
}
//case 4
function patternZ(){
    $(".eAttack1 img").fadeIn(100);
        
    setTimeout(function(){
        $(".eAttack4 img").fadeIn(100);
        
        setTimeout(function(){
            $(".eAttack5 img").fadeIn(100);
            
            setTimeout(function(){
                $(".eAttack6 img").fadeIn(100);
                
                setTimeout(function(){
                    console.log("PHASE COMPLETE");
                    $(".eAtk").fadeOut(75);
                    damaged();
                    nextPattern=true;
                        
                }, 2*time);
            }, time);
        }, time);
    }, time);
}
//case 5
function patternSquare(){
    $(".eAttack6 img").fadeIn(100);
    
    setTimeout(function(){
        $(".eAttack2 img").fadeIn(100);

        setTimeout(function(){
            $(".eAttack1 img").fadeIn(100);

            setTimeout(function(){
                $(".eAttack5 img").fadeIn(100);
            
                setTimeout(function(){
                    console.log("PHASE COMPLETE");
                    $(".eAtk").fadeOut(75);
                    damaged();
                    nextPattern=true;
                    
                }, 2*time);
            }, time);
        }, time);
    }, time);
}
//case 6
function patternFish(){
    $(".eAttack6 img").fadeIn(100);

    setTimeout(function(){
        $(".eAttack1 img").fadeIn(100);

        setTimeout(function(){
            $(".eAttack3 img").fadeIn(100);
        
            setTimeout(function(){
                $(".eAttack5 img").fadeIn(100);
            
                setTimeout(function(){
                    $(".eAttack2 img").fadeIn(100);
                
                    setTimeout(function(){
                        console.log("PHASE COMPLETE");
                        $(".eAtk").fadeOut(75);
                        damaged();
                        nextPattern=true;
                        
                    }, 2.5*time);
                }, time);
            }, time);
        }, time);
    }, time);
}
//case 7
function patternSemiC(){
    $(".eAttack5 img").fadeIn(100);

    setTimeout(function(){
        $(".eAttack2 img").fadeIn(100);

        setTimeout(function(){
            $(".eAttack4 img").fadeIn(100);
        
            setTimeout(function(){
                $(".eAttack6 img").fadeIn(100);
                
                setTimeout(function(){
                    console.log("PHASE COMPLETE");
                    $(".eAtk").fadeOut(75);
                    damaged();
                    nextPattern=true;
                    
                }, 2*time);
            }, .75*time);
        }, .75*time);
    }, time);
}
//case 8
function patternSwoop(){
    $(".eAttack4 img").fadeIn(100);

    setTimeout(function(){
        $(".eAttack3 img").fadeIn(100);

        setTimeout(function(){
            $(".eAttack5 img").fadeIn(100);
        
            setTimeout(function(){
                $(".eAttack6 img").fadeIn(100);
            
                setTimeout(function(){
                    $(".eAttack1 img").fadeIn(100);
                    
                        setTimeout(function(){
                            console.log("PHASE COMPLETE");
                            $(".eAtk").fadeOut(75);
                            damaged();
                            nextPattern=true;
                            
                        }, 2.5*time);
                }, .75*time);
            }, .75*time);
        }, .75*time);
    }, time);
}
//case 9
function patternAllRounder(){
    $(".eAttack5 img").fadeIn(100);

    setTimeout(function(){
        $(".eAttack3 img").fadeIn(100);

        setTimeout(function(){
            $(".eAttack1 img").fadeIn(100);
        
            setTimeout(function(){
                $(".eAttack2 img").fadeIn(100);
            
                setTimeout(function(){
                    $(".eAttack4 img").fadeIn(100);
                
                    setTimeout(function(){
                        $(".eAttack6 img").fadeIn(100);
                    
                        setTimeout(function(){
                            console.log("PHASE COMPLETE");
                            $(".eAtk").fadeOut(75);
                            damaged();
                            nextPattern=true;
                            
                        }, 3*time);
                    }, .75*time);
                }, .75*time);
            }, .75*time);
        }, .75*time);
    }, .75*time);
}
//case 10
function patternMurder(){
    $(".eAttack3 img").fadeIn(100);

    setTimeout(function(){
        $(".eAttack4 img").fadeIn(100);

        setTimeout(function(){
            $(".eAttack1 img").fadeIn(100);
        
            setTimeout(function(){
                $(".eAttack6 img").fadeIn(100);
            
                setTimeout(function(){
                    $(".eAttack2 img").fadeIn(100);
                
                    setTimeout(function(){
                        $(".eAttack5 img").fadeIn(100);
                    
                        setTimeout(function(){
                            console.log("PHASE COMPLETE");
                            $(".eAtk").fadeOut(75);
                            damaged();
                            nextPattern=true;
                            
                        }, 3*time);
                    }, .75*time);
                }, .75*time);
            }, .75*time);
        }, .75*time);
    }, .75*time);
}


/**     ePattern ref

$(".eAttack1 img").fadeIn(100);

setTimeout(function(){
    $(".eAttack2 img").fadeIn(100);

}, time);


setTimeout(function(){
    console.log("PHASE COMPLETE");
    $(".eAtk").fadeOut(75);
    damaged();
    nextPattern=true;
    
}, 2*time);
**/