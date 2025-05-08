import logging
import os
import sys
from pathlib import Path

# Add the parent directory to Python path so we can import from app
sys.path.append(str(Path(__file__).parent.parent))

from sqlalchemy import select
from sqlalchemy.orm import selectinload
import pandas as pd
from app.models import Incident
from app.database import get_db

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class IncidentExporter:
    def __init__(self, db):
        self.db = db

    def export_report(self, output_path: str = "incident_report.csv"):
        """Export incident data to CSV."""
        try:
            incidents = self.db.execute(
                select(Incident)
                .options(selectinload(Incident.owner))
            )
            
            data = []
            for incident in incidents.scalars():
                data.append({
                    'ID': incident.id,
                    'Title': incident.title,
                    'Description': incident.description,
                    'Severity': incident.severity.value,
                    'Status': incident.status.value,
                    'Timestamp': incident.timestamp,
                    'Owner': incident.owner.username
                })
            
            df = pd.DataFrame(data)
            df.to_csv(output_path, index=False)
            logger.info(f"Report exported to {output_path}")
        except Exception as e:
            logger.error(f"Error exporting report: {str(e)}")
            raise

def main():
    """Main function to run the export."""
    try:
        for db in get_db():
            exporter = IncidentExporter(db)
            exporter.export_report()
            
    except Exception as e:
        logger.error(f"Error in main execution: {str(e)}")
        raise

if __name__ == "__main__":
    main() 