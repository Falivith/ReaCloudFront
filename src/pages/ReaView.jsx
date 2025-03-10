import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { ReaPanel } from "../components/reaview/ReaPanel";
import { CommentSection } from "../components/reaview/CommentSection";
import { Recommendations } from "../components/reaview/Recommendations";
import styles from "../App.module.css";
import { getResourceInfo } from "../services/reaquerys";
import Loading from "../components/Loading";
import { Help } from "../components/Help";

export function ReaView() {
  const { id, comments } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [rea, setRea] = useState(null);
  const [commentSectionMounted, setCommentSectionMounted] = useState(false);

  const commentSectionRef = useRef(null);

  useEffect(() => {
    const fetchResourceInfo = async () => {
      try {
        const result = await getResourceInfo(id);
        setRea(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch resource info", error);
        setIsLoading(false);
      }
    };

    fetchResourceInfo();
  }, [id]);

  const scrollToComments = () => {
    if (commentSectionMounted) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (comments === "comments") {
      scrollToComments();
    }
  }, [commentSectionMounted]);

  return (
    <div>
      <Header />
      <div className={styles.reaViewContainer}>
        <div className={styles.reaViewContent}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className={styles.contentAndRecommendationsWrapper}>
                <div className={styles.panelAndCommentsWrapper}>
                  <ReaPanel
                    rea={rea}
                    isLoading={isLoading}
                    scrollToComments={scrollToComments}
                  />
                  <div
                    ref={commentSectionRef}
                    onLoad={() => setCommentSectionMounted(true)}
                  >
                    <CommentSection resourceId={id} />
                  </div>
                </div>
                <Recommendations />
              </div>
            </>
          )}
        </div>
      </div>
      <Help />
    </div>
  );
}
