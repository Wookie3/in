

import { Button } from "@/components/ui/button";


export default function Foragainstbtn( {isforstate, set_isforstate} ) {

    const shadecolor = "bg-orange-300";

    const handle_foragainst = (is_For) => {
        if (isforstate === is_For) {
            set_isforstate();
        }
        else {
            set_isforstate(is_For);
        }
    }

    return (
        <>
            <Button variant="outline" className={(isforstate === true ? shadecolor: "")} onClick={ () => handle_foragainst(true) }>
                For
            </Button>
            <Button variant="outline" className={(isforstate === false ? shadecolor: "")} onClick={ () => handle_foragainst(false) }>
                Against
            </Button>
        </>
    );
    
}


/* export default function Foragainstbtn ( {likestate, setlikestate} ) {

    const handleLikeDislike = (isLiked) => {
        if (likestate === isLiked) {
            setlikestate();
        }
        else {
            setlikestate(isLiked);
        }
    }


    return(
        <ButtonGroup variant="outlined" aria-label="outlined button group" className="btnbox" >
            <Button className={(likestate === 1 ? "activebtn": "")} onClick={ () => handleLikeDislike(1) } > 
                <ThumbUpAltIcon className={(likestate === 1 ? "activethumb": "inactivethumb")} /> 
            </Button>
            
            
            <Button className={(likestate === 0 ? "activebtn": "")} onClick={ () => handleLikeDislike(0) } > 
                <ThumbDownAltIcon className={(likestate === 0 ? "activethumb": "inactivethumb")}/> 
            </Button>

        </ButtonGroup>
    );
    
} */


