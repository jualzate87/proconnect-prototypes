import React, { useState, useEffect } from 'react';
import './ReviewScoreCard.css';

interface ReviewScoreCardProps {
  overall: number;
  accuracy: number;
  completeness: number;
  risk: number;
}

export const ReviewScoreCard: React.FC<ReviewScoreCardProps> = ({
  overall,
  accuracy,
  completeness,
  risk,
}) => {
  const [animatedOverall, setAnimatedOverall] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setAnimatedOverall(Math.round(eased * overall));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [animate, overall]);

  return (
    <div className="review-score-card">
      <h3 className="score-card-title">Review Score</h3>
      <div className="score-card-overall">{animatedOverall}%</div>

      <div className="score-card-metrics">
        <div className="score-metric">
          <div className="score-metric-header">
            <span className="score-metric-label">Accuracy</span>
            <span className="score-metric-value">{accuracy}%</span>
          </div>
          <div className="score-metric-bar">
            <div
              className="score-metric-fill accuracy"
              style={{ width: animate ? `${accuracy}%` : '0%' }}
            />
          </div>
        </div>

        <div className="score-metric">
          <div className="score-metric-header">
            <span className="score-metric-label">Completeness</span>
            <span className="score-metric-value">{completeness}%</span>
          </div>
          <div className="score-metric-bar">
            <div
              className="score-metric-fill completeness"
              style={{ width: animate ? `${completeness}%` : '0%' }}
            />
          </div>
        </div>

        <div className="score-metric">
          <div className="score-metric-header">
            <span className="score-metric-label">Risk</span>
            <span className="score-metric-value">{risk}%</span>
          </div>
          <div className="score-metric-bar">
            <div
              className="score-metric-fill risk"
              style={{ width: animate ? `${risk}%` : '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
