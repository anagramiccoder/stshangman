import { motion, AnimatePresence} from "framer-motion";
import { useEffect } from "react";
import "./Modal.css"
function PersonalModal(props){
    useEffect(() => {
        const keyDownHandler = event => {
          if (event.key === 'Escape') {
            event.preventDefault();
            // 👇️ your logic here
            props.close();
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }, []);
    return(<>
        <AnimatePresence>
            {props.open&& <>
                <motion.div 
                initial={{
                    opacity:0
                }}
                animate={{
                    opacity:1
                }}
                exit={{
                    opacity:0   
                }}
                onClick={props.close}
                className="modal-backdrop"/>
                <motion.div 
                initial={{
                    opacity:0,
                    scale:0
                }}
                animate={{
                    opacity:1,
                    scale:1,
                    transition:{
                        duration:0.2
                    }
                }}
                exit={{
                    scale:0
                }}
                className={props.extraclass+" "+"modal-content-wrapper"}>
                    <motion.div 
                    className="modal-content"
                    initial={{
                        x:600
                    }}
                    animate={{
                        x:0,
                        transition:{
                            duration:0.3
                        }
                    }}
                    exit={{
                        x:600,
                        opacity:0
                    }}>
                            {props.children}
                    </motion.div>
                </motion.div>
            </>
            }
        </AnimatePresence>
        </>
    );
}
export default PersonalModal;