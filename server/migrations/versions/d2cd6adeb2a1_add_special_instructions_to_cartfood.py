"""Add special_instructions to CartFood

Revision ID: d2cd6adeb2a1
Revises: 2423cffb00e6
Create Date: 2025-04-04 10:30:56.604861

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2cd6adeb2a1'
down_revision = '2423cffb00e6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cart_foods', schema=None) as batch_op:
        batch_op.add_column(sa.Column('special_instructions', sa.String(), nullable=True))

    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.alter_column('total_price',
               existing_type=sa.FLOAT(),
               type_=sa.Numeric(precision=10, scale=2),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.alter_column('total_price',
               existing_type=sa.Numeric(precision=10, scale=2),
               type_=sa.FLOAT(),
               existing_nullable=True)

    with op.batch_alter_table('cart_foods', schema=None) as batch_op:
        batch_op.drop_column('special_instructions')

    # ### end Alembic commands ###
