import React, { useState, useMemo } from "react";
import { VideoChatParticipant } from "./VideoChatParticipant";
import Grid from "../../../shared/molecules/Grid";
import classes from "./ParticipantsGrid.module.css"
import IconButton from "../../../shared/atoms/buttons/IconButton";
import Icon from "../../../shared/atoms/icons/Icon";

interface ParticipantsGridProps {
    participants: React.ReactElement<React.ComponentProps<typeof VideoChatParticipant>>[];
    maxRows: number;
    maxCols: number;
}

export const ParticipantsGrid: React.FC<ParticipantsGridProps> = ({
    participants,
    maxRows,
    maxCols,
}) => {
    const [currentPage, setCurrentPage] = useState(0);

    const { participantsPerPage, totalPages } = useMemo(() => {
        const participantsPerPage = maxRows * maxCols;
        const totalPages = Math.ceil(participants.length / participantsPerPage);
        
        return {
            participantsPerPage,
            totalPages
        };
    }, [participants.length, maxRows, maxCols]);

    const enhancedParticipants = useMemo(() => {
        return participants.map((participant, index) => {
            const pageIndex = Math.floor(index / participantsPerPage);
            const isVisible = pageIndex === currentPage;
            
            return React.cloneElement(participant, {
                key: participant.key || index,
                className: `${participant.props.className || ''} ${isVisible ? classes.visible : classes.hidden}`
            } as Partial<unknown>);
        });
    }, [participants, currentPage, participantsPerPage]);

    const handlePreviousPageClick = () => {
        setCurrentPage(prev => Math.max(prev - 1, 0));
    }

    const handleNextPageClick = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
    }

    const showNavigation = totalPages > 1;

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {showNavigation && (
                    <IconButton 
                        className={classes.navigationButton} 
                        onClick={handlePreviousPageClick} 
                        icon={<Icon path="/icons/femaleArrowLeftWhite.svg" />}
                        disabled={currentPage === 0}
                    />
                )}
                
                <Grid 
                    className={classes.grid}
                    rows={maxRows}
                    cols={maxCols}
                    verticalGap={20}
                    horizontalGap="20px"
                    elements={enhancedParticipants}
                />
                
                {showNavigation && (
                    <IconButton 
                        className={classes.navigationButton} 
                        onClick={handleNextPageClick} 
                        icon={<Icon path="/icons/femaleArrowRightWhite.svg" />}
                        disabled={currentPage === totalPages - 1}
                    />
                )}
            </div>

            {showNavigation && (
                <div className={classes.pagination}>
                    <span className={classes.pageIndicator}>
                        {currentPage + 1} / {totalPages}
                    </span>
                </div>
            )}
        </div>
    )
};