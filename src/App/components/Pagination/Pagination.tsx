import styles from './Pagination.module.scss';
import arrowBackIcon from '~assets/images/arrow-right.svg'
import arrowForwardIcon from '~assets/images/arrow-rightSingle.svg'
import { useSearchParams } from 'react-router';
import type { PaginationProps } from './types';
import { getNumberCountArr } from '~utils/helpers';


const Pagination = ({ pageCount, actualPage }: PaginationProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const numberCountArr = getNumberCountArr(pageCount);
    const handleClick = (newActualPage: number) => {
        searchParams.set('page', `${newActualPage}`);
        setSearchParams(searchParams);
    };

    return (
        <div className={styles.pagination}>
            <button className={styles['pagination__arrow']}
                onClick={() => handleClick(actualPage > 1 ? actualPage - 1 : 1)}
                disabled={actualPage === 1}
            >
                <img src={arrowBackIcon} alt='back' />
            </button>
            {numberCountArr.map((item) => {

                return (<button className={`${styles.pagination__pagenumber} ${item === actualPage ? styles['pagination__pagenumber--active'] : ''
                    }`}
                    key={item}
                    onClick={() => handleClick(item)}
                >{item}</button>)
            }
            )}
            <button className={styles['pagination__arrow']}
                onClick={() => handleClick(actualPage < pageCount ? actualPage + 1 : pageCount)}
                disabled={actualPage === pageCount}
            >
                <img src={arrowForwardIcon} alt='forward' />
            </button>
        </div>
    )
}

export default Pagination;