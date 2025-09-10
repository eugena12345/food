import { useParams } from 'react-router';
import styles from './ReceptPage.module.scss'
import { useEffect } from 'react';

const ReceptPage = () => {
    const { id } = useParams();

    useEffect(()=>{
        // запросить данные по ид 
    }, []);
    return (
        <div className={styles.container}>
            ReceptPage
        </div>
    )
};

export default ReceptPage;